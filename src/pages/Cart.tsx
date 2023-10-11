import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
    return (
      <MainLayout header={<Header />} main={<Cart />} footer={<Footer />} />
    );
  };
  
  export default MainPage;