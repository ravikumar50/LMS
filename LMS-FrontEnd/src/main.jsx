import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import store from "../Redux/store.js";
import App from "./App.jsx";
import { Provider } from "./react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster></Toaster>
    </BrowserRouter>
  </Provider>,
);
