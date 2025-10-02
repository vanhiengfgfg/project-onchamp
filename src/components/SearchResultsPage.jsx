import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

function SearchResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result = []} = location.state || {};
    const [sortOption, setSortOption] = useState('default');

    // Sắp xếp sản phẩm theo lựa chọn
    const sortedProducts = useMemo(() => {
        if (sortOption === 'asc') {
            return [...result].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'desc') {
            return [...result].sort((a, b) => b.price - a.price);
        }
        return result;
    }, [result, sortOption]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="w-[65%] ml-[17.5%]">
            <p className="text-gray-600 mb-4 text-center mt-6">
                Tìm thấy {result.length} sản phẩm
            </p>

            <div className="flex justify-end mr-10 text-[18px]">
                <div className="mr-4 mt-1">Lọc nhanh: </div>
                <div>
                    <select
                        className="border rounded px-2 py-1"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>

            {sortedProducts.length > 0 ? (
                <div className="mt-6 grid grid-cols-5 gap-4 justify-center items-center">
                    {sortedProducts.map((product) => (
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
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">
                        Không tìm thấy sản phẩm nào.
                    </p>
                </div>
            )}
        </div>
    );
}

export default SearchResultsPage;
