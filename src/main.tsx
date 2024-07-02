import "./styles/index.css";
import ReactDOM from "react-dom/client";
import GameLoop from "./components/GameLoop";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <GameLoop />
    </Provider>
);
