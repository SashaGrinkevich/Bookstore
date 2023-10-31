
import Favorite from "../components/Favorites/Favorite";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
    return (
      <MainLayout header={<Header />} main={<Favorite    />} footer={<Footer />} />
    );
  };
  
  export default MainPage;