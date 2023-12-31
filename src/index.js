import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./context/Todo";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
