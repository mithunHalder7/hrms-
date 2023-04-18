import React from 'react';
import Admin_Sidebar from "./scenes/global/Admin_Sidebar";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import { Typography, Button, Box, TextField, Modal } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import LoggedInSidebar from "./scenes/global/LoggedInSidebar";
import Dashboard from "./scenes/dashboard";
import Organogram from "./scenes/organogram";
import EmlpoyeeList from "./scenes/Employee";
import { Routes, Route, Link } from "react-router-dom";
import LeaveApply from "./scenes/LeaveApply";
import LeaveRecord from "./scenes/LeaveRecord";
import LeaveStatus from "./scenes/LeaveStatus";
import LeaveApproval from "./scenes/LeaveApproval";
import { useState } from 'react';
import EmployeeSystem from './EmployeeSystem';
import useFetch from './scenes/organogram/useFetch';
import axios from 'axios';











export default function LoginPage() {
  const usr_list = useFetch('http://localhost:5000/employee');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(username, password);
    if(username == "admin" && password == "1234")
    {
      sessionStorage.setItem('act_usr_name', username);
      sessionStorage.setItem('active_user', 'admin');
      window.location.reload(); 
    }
    else{
      let verifyObj = "";
      const obj={
          "password": password.toString(),
          "user_name": username
      }
      axios.post('http://localhost:5000/employee/login', obj)
      .then(function (response) {
        if(response.data.login_status == "success")
        {
          
          const usr_id = usr_list?.filter((usr) => usr.user_name == username);
          sessionStorage.setItem('act_usr_id', usr_id[0].id);
          sessionStorage.setItem('act_usr_name', username);
          sessionStorage.setItem('active_user', 'employee');
          sessionStorage.setItem('user_pass_stat', response.data.change_password_status.toString());
          window.location.reload();
        }
        else
        {
          window.alert("invalid username/password");
        }
        console.log(response.data.login_status);
      })
      .catch(function (error) {
        // console.log(error);
        verifyObj = error;
      });

      // console.log(verifyObj);

    }
  }






  return (
    <div className="app">
      <LoggedInSidebar />
      <main className="content_">

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
                type='text'
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
                type='password'
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
  )
}
