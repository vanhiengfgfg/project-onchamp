import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AboutUs from '../pages/AboutUs';
import SearchResultsPage from '../components/SearchResultsPage';
const publicRoutes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/productdetailpage/:id',
        component: ProductDetailPage,
    },
    {
        path: '/productlistpage',
        component: ProductListPage,
    },
    {
        path: '/about',
        component: AboutUs,
    },
    {
        path: '/search',
        component: SearchResultsPage
    }
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
