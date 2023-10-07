import "./variables.css";
import Router from "./router/router";
import { Provider } from "react-redux";
import { store } from "./store";


const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
