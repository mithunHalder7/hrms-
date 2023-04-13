import React, {useEffect} from 'react';
import Sidebar from './scenes/global/Sidebar';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
import LeaveApply from './scenes/LeaveApply';
import LeaveStatus from './scenes/LeaveStatus';
import LeaveApproval from './scenes/LeaveApproval';
import LeaveRecord from './scenes/LeaveRecord';
import Topbar from "./scenes/global/Topbar";
import { useState } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Routes } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useFetch from './scenes/organogram/useFetch';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// window.localStorage.clear();
export default function EmployeeSystem() {

  const chunks = useFetch("http://localhost:5000/office_post");
  

  
  // console.log(pos_id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("pressed");
  };

  return (
    <div className="app">
        <Sidebar />
        <main className="content">
        <Topbar />
          {(
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          )}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/LeaveApply" element={<LeaveApply />} />
            <Route path="/LeaveRecord" element={<LeaveRecord />} />
            <Route path="/LeaveStatus" element={<LeaveStatus />} />
            <Route path="/LeaveApproval" element={<LeaveApproval postData = {chunks}/>} />
            {/* <Route path="/organogram" element={<Organogram />} /> */}
            {/* <Route path="/Employee" element={<EmlpoyeeList />} /> */}
            
          </Routes>
        </main>
      </div>
  )
}
