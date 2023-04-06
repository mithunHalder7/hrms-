import { Box, IconButton, useTheme, TextField, Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Logout from "@mui/icons-material/Logout";
import { ChangeCircleSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Topbar = (props) => {
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [retype_new_password, setRetypePassword] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //For logout Menubar
  const logOutHandle = () => {
    handleClose();
    window.location.reload();
    sessionStorage.setItem("usr_active", "logout");
  };

  //For password change menubar
  const handlePasswordChange = () => {
    setOpenDialog(true);
  };

  // for closing dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //for password changef form submission
  const handlePasswordChangeFormSubmit = (e) =>{
    e.preventDefault();
    setNewPassword('');
    setRetypePassword('');
    setCurrentPassword('');

    const PasswordData = {
       new_password,
       retype_new_password,
    };

    console.log(PasswordData);

  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Dialog open={openDialog} onClose={handleClose}>
        <form onSubmit={handlePasswordChangeFormSubmit}>
          <DialogTitle>পাসওয়ার্ড পরিবর্তন</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              label="বর্তমান পাসওয়ার্ড"
              name="current_password"
              value={current_password}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              variant="standard"
              label="নতুন পাসওয়ার্ড ইনপুট"
              name="new_password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              variant="standard"
              label="পুনরায় নতুন পাসওয়ার্ড ইনপুট"
              name="retype_new_password"
              value={retype_new_password}
              onChange={(e) => setRetypePassword(e.target.value)}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleCloseDialog}>পরিবর্তন</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box
        display="flex"
        borderRadius="50px"
        marginLeft="auto"
        background="#F7FBFC"
        boxShadow="0px 0px 15px -3px rgba(0, 0, 0, 0.25)"
      >
        <Box sx={{ flex: 1 }} />
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 15 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handlePasswordChange}>
          <ListItemIcon>
            <ChangeCircleSharp fontSize="small" />
          </ListItemIcon>
          পাসওয়ার্ড পরিবর্তন করুন
        </MenuItem>

        <MenuItem onClick={logOutHandle}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          লগ-আউট
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
