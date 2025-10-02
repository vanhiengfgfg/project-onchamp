import Footer from "../components/Footer";
import Slice from "../components/Slice";
import MainLayout from "../layouts/MainLayout"
import ProductListPage from "./ProductListPage";
import Popup from "../components/Popup";
function HomePage() {
    return ( <div>
        <MainLayout></MainLayout>
        <Slice></Slice>
        <ProductListPage></ProductListPage>
        <Footer/>
        <Popup/>
    </div> );
}

export default HomePage;