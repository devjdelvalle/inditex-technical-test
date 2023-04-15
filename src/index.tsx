import { createRoot } from "react-dom/client";
import { App } from "./infrastructure/app/app";
import { store } from "./infrastructure/store";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
