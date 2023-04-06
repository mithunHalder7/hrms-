import React, { useState } from "react";
import Admin_Sidebar from "./scenes/global/Admin_Sidebar";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import { Typography, Button, Box, TextField, Modal } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import LoggedInSidebar from "./scenes/global/LoggedInSidebar";
import Dashboard from "./scenes/dashboard";
import Organogram from "./scenes/organogram";
import EmlpoyeeList from "./scenes/Employee";
import { Routes, Route } from "react-router-dom";
import LeaveApply from "./scenes/LeaveApply";
import LeaveRecord from "./scenes/LeaveRecord";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // send the username and password to the server for authentication

    if (password === "1234") {
      sessionStorage.setItem('usr_active', password);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      setLoggedIn(true);
    } else {
      setLoggedIn(true);
    }
  }

  let active_usr = sessionStorage['usr_active'];
  if (active_usr == "1234" | loggedIn) {
    return (
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          {showModal && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "55%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "50px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
                zIndex: "999",
              }}
            >
              <Typography variant="h5">পাসওয়ার্ড পরিবর্তন করুন</Typography>
            </Box>
          )}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/LeaveApply" element={<LeaveApply />} />
            <Route path="/LeaveRecord" element={<LeaveRecord />} />
            {/* <Route path="/organogram" element={<Organogram />} /> */}
            {/* <Route path="/Employee" element={<EmlpoyeeList />} /> */}
            
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <LoggedInSidebar />
      <main className="content">
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">লগ-ইন</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ m: 1, p: 5 }} variant="standard">
              <TextField
                variant="standard"
                label="নাম"
                name="name"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1, p: 5 }} variant="standard">
              <TextField
                variant="standard"
                label="পাসওয়ার্ড"
                name="phone"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </FormControl>

            <Box display="flex" justifyContent="center">
              <Box mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    borderRadius: 12,
                    backgroundColor: "#99C4C8",
                    color: "black",
                    ":hover": {
                      color: "white",
                    },
                  }}
                >
                  প্রবেশ করুন
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </main>
    </div>
  );
}

export default LoginPage;
