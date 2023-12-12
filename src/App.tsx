import "./variables.css";
import Router from "./router/router";
import { Provider } from "react-redux";
import { store } from "./store";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";


const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ScrollToTopButton />
    </Provider>
  );
};

export default App;
