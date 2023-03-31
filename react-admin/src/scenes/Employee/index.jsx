import { Box, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { mockDataEmployee } from "../../data/mockData";
import ModalAddEmployee from "./ModalAdd";


import useMediaQuery from "@mui/material/useMediaQuery";

import Container from "@mui/material/Container";
import EmpInfoModal from "./components/EmpInfoModal";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const EmlpoyeeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  //Modal Edit
  // const [openEdit, setOpenEdit] = React.useState(false);
  // const handleOpenEdit = () => setOpenEdit(true);
  // const handleCloseEdit = () => setOpenEdit(false);
  const [open, setOpen] = React.useState(false);




//edit button functionality
  const renderDetailsButton = (params) => {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <strong>
        <Button
          variant="outlined"
          color="warning"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={handleOpen}
        >
          Edit
        </Button>
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
      </strong>
    )
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "নাম" },
    {
      field: "phone",
      headerName: "ফোন",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "email",
      headerName: "ইমেইল",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "address",
      headerName: "এড্রেস",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: renderDetailsButton,
    },
  ];


  return (
    <Box m="20px">
      <Header
        title="কর্মকর্তা/কর্মচারী "
        subtitle="কর্মকর্তা/কর্মচারীর তালিকা"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

        <ModalAddEmployee />

        <DataGrid
          rows={mockDataEmployee}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default EmlpoyeeList;
