import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginPage from "./login";
import { BrowserRouter } from "react-router-dom";

// window.localStorage.setItem('usr_active', JSON.stringify());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginPage/>
    </BrowserRouter>
  </React.StrictMode>
);
