import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('looix');
                setLoading(false);
            });
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex((item) => item.id === product.id);
        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div className="w-[80%] mx-auto py-8">
            <button
                onClick={handleGoBack}
                className="mb-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
                Quay lai
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-lg mb-4"
                    />
                </div>
                <div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex-1"
                    >
                        Thêm vào giỏ hàng
                    </button>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex-1 ">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
