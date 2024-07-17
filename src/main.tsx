import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import "./index.css";
import { AppProviders } from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProviders>
        <App />
      </AppProviders>
    </Provider>
  </BrowserRouter>
);
