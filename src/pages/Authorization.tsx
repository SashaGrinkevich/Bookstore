import Authorization from "../components/Autorization/Authorization";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
  return (
    <MainLayout
      header={<Header />}
      main={<Authorization />}
      footer={<Footer />}
    />
  );
};

export default MainPage;
