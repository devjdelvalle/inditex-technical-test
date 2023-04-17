/* istanbul ignore file */
import { createRoot } from "react-dom/client";
import { App } from "./infrastructure/app/app";
import { persistor, store } from "./infrastructure/store";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import Header from "./infrastructure/components/header";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ChapterView from "./infrastructure/views/chapter/chapter.view";
import React from "react";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="main-index">
                  <Header isLoading={true} />
                </div>
              }
            ></Route>
          </Routes>
        </MemoryRouter>
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
);
