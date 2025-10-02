import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(28);
    const [sortOption, setSortOption] = useState('default');
    


    useEffect(() => {
        sessionStorage.setItem('sortOption', sortOption);
    }, [sortOption]);

    // Lưu visibleCount vào sessionStorage khi thay đổi
    useEffect(() => {
        sessionStorage.setItem('visibleCount', visibleCount);
    }, [visibleCount]);

    const showMore = () => {
        setVisibleCount((prev) => prev + 12);
    };
    const showLess = () => {
        setVisibleCount(28);
    };

    const handleProductClick = (productId) => {
        navigate(`/productdetailpage/${productId}`);
    };

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products?limit=100&offset=0')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Looix');
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    const sortedProduct = [...products].sort((a, b) => {
        if (sortOption === 'asc') {
            return a.price - b.price;
        }
        if (sortOption === 'desc') {
            return b.price - a.price;
        }
    });

    return (
        <div className="w-[65%] ml-[17.5%]">
            <div className="flex justify-end mr-10 text-[18px]">
                <div className="mr-4 mt-1">Lọc nhanh: </div>
                <div>
                    <select
                        className="border rounded px-2 py-1"
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-4 justify-center items-center">
                {sortedProduct.slice(0, visibleCount).map((product) => (
                    <div
                        key={product.id}
                        className="border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img
                            src={product.images?.[0]}
                            alt={product.title}
                            className="w-full h-[180px] object-cover rounded mb-2"
                        />
                        <h3 className="text-sm font-medium truncate mb-1">
                            {product.title}
                        </h3>
                        <p className="text-lg font-bold text-green-600">
                            {product.price} $
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center">
                {visibleCount < products.length && (
                    <button onClick={showMore}>Xem them</button>
                )}
            </div>
            <div className="flex items-center justify-center">
                {visibleCount == products.length && (
                    <button onClick={showLess}>Thu gon</button>
                )}
            </div>
        </div>
    );
}

export default ProductListPage;
