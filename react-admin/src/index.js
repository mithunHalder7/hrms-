import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import EmployeeSystem from "./EmployeeSystem";
import AdminSystem from "./AdminSystem";

// window.localStorage.setItem('usr_active', JSON.stringify());
const root = ReactDOM.createRoot(document.getElementById("root"));

const active_user = sessionStorage.getItem("active_user");


if(active_user == "admin")
{
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <AdminSystem/>
    </BrowserRouter>
  </React.StrictMode>
    );
}
else if(active_user == "employee")
{
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <EmployeeSystem/>
    </BrowserRouter>
  </React.StrictMode>
    );
}
else{
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <LoginPage/>
    </BrowserRouter>
  </React.StrictMode>
    );
}

