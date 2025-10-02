import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Register from './Register';

function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value;

            if (value.trim().length > 0) {
                try {
                    const res = await fetch(
                        'https://api.escuelajs.co/api/v1/products',
                    );
                    const data = await res.json();

                    const filtered = data.filter((item) =>
                        item.title.toLowerCase().includes(value.toLowerCase()),
                    );

                    navigate('/search', {
                        state: { result: filtered, term: value },
                    });
                } catch (err) {
                    console.error('Lỗi tìm kiếm: ', err);
                }
            }
        }
    };
    // Thêm useEffect này vào Header component
    useEffect(() => {
        // Nếu đang ở trang search và searchTerm rỗng
        if (location.pathname === '/search' && searchTerm === '') {
            const timer = setTimeout(() => {
                navigate('/');
            }, 500); // Delay 500ms để tránh navigate quá nhanh

            return () => clearTimeout(timer);
        }
    }, [searchTerm, location.pathname, navigate]);

    return (
        <div className="border-b-2 shadow-lg border-black flex flex-row bg-white h-[100px] space-x-20 text-xl font-semibold items-center justify-center">
            {/* menu */}
            <div className="flex flex-row space-x-4 ">
                <div
                    className="cursor-pointer border-b-2 border-transparent hover:border-black"
                    onClick={() => navigate('/')}
                >
                    SHOP
                </div>
                <div className="cursor-pointer border-b-2 border-transparent hover:border-black">
                    COLLAB
                </div>
                <div className="cursor-pointer border-b-2 border-transparent hover:border-black">
                    CONTACT
                </div>
                <div
                    className="cursor-pointer border-b-2 border-transparent hover:border-black"
                    onClick={() => navigate('/about')}
                >
                    ABOUT US
                </div>
                <div className="cursor-pointer border-b-2 border-transparent hover:border-black">
                    BEST SELLER
                </div>
            </div>

            {/* search */}
            <div className="relative">
                <input
                    className="pl-2 pr-2 pt-1 pb-1 list-none focus:outline-none rounded-md w-56 border-2 border-black"
                    type="search"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} // nhấn Enter mới tìm
                />
            </div>

            {/* cart */}
            <div>
                <div
                    className="cursor-pointer"
                    onClick={() => setIsCartOpen(true)}
                >
                    Giỏ hàng ({cart.length})
                </div>
                {isCartOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setIsCartOpen(false)}
                    >
                        <div
                            className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
                            {cart.length === 0 ? (
                                <p>Giỏ hàng trống.</p>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center border-b py-2"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.images?.[0]}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-semibold">
                                                    {item.title}
                                                </h3>
                                                <p>
                                                    ${item.price} x{' '}
                                                    {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleRemoveFromCart(item.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div onClick={() => setIsRegisterOpen(true)}>ĐĂNG KÍ</div>
            {isRegisterOpen && (
                <Register onClose={() => setIsRegisterOpen(false)} />
            )}
        </div>
    );
}

export default Header;
