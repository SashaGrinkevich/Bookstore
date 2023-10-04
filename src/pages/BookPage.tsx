import BookPostDetail from "../components/BookPostDetail/BookPostDetail";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
    return (
      <MainLayout header={<Header />} main={<BookPostDetail />} footer={<Footer />} />
    );
  };
  
  export default MainPage;
  