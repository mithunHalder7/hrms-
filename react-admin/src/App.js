import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import EmlpoyeeList from "./scenes/Employee";
import Form from "./scenes/form";
import LoginPage from "./LoginPage";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Organogram from "./scenes/organogram";


function App() {
  

  return (
    
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar  />
            <Routes>
              <Route path="/" element={<LoginPage/>} />
            </Routes>
          </main>
        </div>
      
  );
}

export default App;
