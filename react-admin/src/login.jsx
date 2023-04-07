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
import LeaveStatus from "./scenes/LeaveStatus";
import LeaveApproval from "./scenes/LeaveApproval";
import axios from "axios";

function LoginPage() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    // send the username and password to the server for authentication

    try {
      const response = await axios.post(
        "http://localhost:5000/employee/login",
        {
          user_name,
          password,
        }
      );

      console.log(
        response.data.change_password_status,
        response.data.login_status
      );

      if (
        response &&
        response.data.change_password_status === 1 &&
        response.data.login_status === "success"
      ) {
        setLoginStatus(true);
        sessionStorage.setItem("usr_active_name", user_name);
        sessionStorage.setItem("user_password",password);
      } else {
        setLoginStatus(false);
        //console.log(loginStatus)
        handleOpen();
        setTimeout(() => setOpen(false), 2000);
      }
    } catch (error) {
      // Handle API call error
      setLoginStatus(
        "Failed to connect to the server. Please try again later."
      );
    }
  };

  let active_usr_name = sessionStorage["usr_active_name"];

  if (active_usr_name == "admin" && loginStatus == true) {
    return (
      <div className="app">
        <Admin_Sidebar />
        <main className="content">
          <Topbar />

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organogram" element={<Organogram />} />
            <Route path="/Employee" element={<EmlpoyeeList />} />
          </Routes>
        </main>
      </div>
    );
  } else if (active_usr_name != "admin" && loginStatus == true) {
    return (
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/LeaveApply" element={<LeaveApply />} />
            <Route path="/LeaveRecord" element={<LeaveRecord />} />
            <Route path="/LeaveStatus" element={<LeaveStatus />} />
            <Route path="/LeaveApproval" element={<LeaveApproval />} />
            <Route path="/organogram" element={<Organogram />} />
            <Route path="/Employee" element={<EmlpoyeeList />} />
          </Routes>
        </main>
      </div>
    );
  } else if (loginStatus == false) {
    return (
      <div className="app">
        <LoggedInSidebar />

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              পাসওয়ার্ড পরিবর্তন করুন 
              </Typography>
            </Box>
          </Modal>
        </div>

        <main className="content">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" sx={{ p: 5 }}>
              লগ-ইন
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form onSubmit={handleLogin}>
              <FormControl fullWidth sx={{ m: 1, p: 5 }} variant="standard">
                <TextField
                  variant="standard"
                  label="নাম"
                  name="name"
                  value={user_name}
                  onChange={handleUsernameChange}
                  fullWidth
                  required
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, p: 5 }} variant="standard">
                <TextField
                  variant="standard"
                  label="পাসওয়ার্ড"
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

  return (
    <div className="app">
      <LoggedInSidebar />

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>

      <main className="content">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ p: 5 }}>
            লগ-ইন
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleLogin}>
            <FormControl fullWidth sx={{ m: 1, p: 5 }} variant="standard">
              <TextField
                variant="standard"
                label="নাম"
                name="name"
                value={user_name}
                onChange={handleUsernameChange}
                fullWidth
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1, p: 5 }} variant="standard">
              <TextField
                variant="standard"
                label="পাসওয়ার্ড"
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
