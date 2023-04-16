/* istanbul ignore file */
import { createRoot } from "react-dom/client";
import { App } from "./infrastructure/app/app";
import { persistor, store } from "./infrastructure/store";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
