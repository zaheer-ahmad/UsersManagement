import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import userStore from "./store/user.slice.js";
import { Provider } from "react-redux";
import "../src/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <Provider store={userStore}>
    <App />
  </Provider>
);
