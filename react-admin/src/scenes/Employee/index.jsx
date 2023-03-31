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

const EmlpoyeeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  //Modal Edit
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "নাম" },

    {
      field: "phone",
      headerName: "ফোন",
      flex: 1,
    },
    {
      field: "email",
      headerName: "ইমেইল",
      flex: 1,
    },
    {
      field: "address",
      headerName: "এড্রেস",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onclick={onClick}
          >
            Edit
          </Button>
        );
      },
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

        <ModalAddEmployee/>
        
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
