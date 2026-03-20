import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AboutUs from '../pages/AboutUs';
import SearchResultsPage from '../pages/SearchResultsPage';
import MainLayout from '../layouts/MainLayout';

const publicRoutes = [
    {
        path: '/',
        element: <HomePage />,
        layout: MainLayout,
    },
    {
        path: '/products',
        element: <ProductListPage />,
        layout: MainLayout,
    },
    {
        path: '/products/:id',
        element: <ProductDetailPage />,
        layout: MainLayout,
    },
    {
        path: '/about',
        element: <AboutUs />,
        layout: MainLayout,
    },
    {
        path: '/search',
        element: <SearchResultsPage />,
        layout: MainLayout,
    },
];

export { publicRoutes };
