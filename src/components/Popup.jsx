import { useEffect, useState } from 'react';
import img1 from '../assets/slice1.webp';

function Popup() {
    const [visible, setVisible] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        // Kiểm tra xem popup đã được hiển thị trong session này chưa
        const hasShownPopup = sessionStorage.getItem('popupShown');

        if (!hasShownPopup) {
            setShouldShow(true);
            setVisible(true);
            // Đánh dấu đã hiển thị popup
            sessionStorage.setItem('popupShown', 'true');
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

    // Không render gì nếu không cần hiển thị hoặc đã đóng
    if (!shouldShow || !visible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative rounded w-[60%] max-w-2xl h-auto max-h-[80vh] justify-center items-center flex bg-slate-50 shadow-2xl animate-fade-in"
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    onClick={handleClose}
                    aria-label="Đóng popup"
                >
                    ✖
                </button>
                <img
                    src={img1}
                    alt="Popup content"
                    className="w-[90%] h-auto object-contain rounded"
                />
            </div>
        </div>
    );
}

export default Popup;
