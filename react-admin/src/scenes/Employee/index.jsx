import { Box, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useState } from "react";
import { useFormik } from "formik";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import Container from "@mui/material/Container";

const EmlpoyeeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //state and function from form

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  //   useFormik.resetForm();
  // };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    fathers_name: yup.string().required("required"),
    mothers_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
  });
  const initialValues = {
    name: "",
    fathers_name: "",
    mothers_name: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];


  //selectbox values
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
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
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItem="flex-end"
        >
          <p style={{ color: "black" }}>এমপ্লয়ী যুক্ত করুন</p>
          <IconButton
            color="success"
            aria-label="add to shopping cart"
            onClick={handleOpen}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              bgcolor: "#0B2447",
              width: "75%",
              height: "100%",
              margin: "auto",
              boxShadow: 3,
              borderRadius: 2,
              display: "block",
              overflow: "scroll",
              color: "black",
            }}
          >
            <h1 style={{ color: "white" }}>কর্মকর্তা/কর্মচারী সংযোজন </h1>

            <Formik
              onSubmit={(values, { resetForm }) => {
                // do your stuff
                console.log(values);
                resetForm();
              }}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      gridColumn: "span 4",
                      color: "black",
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="নাম"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="পিতার নাম"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fathers_name}
                      name="fathers_name"
                      error={!!touched.fathers_name && !!errors.fathers_name}
                      helperText={touched.fathers_name && errors.fathers_name}
                      sx={{ gridColumn: "span 1" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="মাতার নাম"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mothers_name}
                      name="mothers_name"
                      error={!!touched.mothers_name && !!errors.mothers_name}
                      helperText={touched.mothers_name && errors.mothers_name}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      id="filled-select-currency-native"
                      select
                      label="Native select"
                      defaultValue="EUR"
                      SelectProps={{
                        native: true,
                      }}
                      helperText="Please select your currency"
                      variant="filled"
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ইমেইল"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ফোন"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="স্থায়ী ঠিকানা"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address1}
                      name="address1"
                      error={!!touched.address1 && !!errors.address1}
                      helperText={touched.address1 && errors.address1}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="অস্থায়ী ঠিকানা"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address2}
                      name="address2"
                      error={!!touched.address2 && !!errors.address2}
                      helperText={touched.address2 && errors.address2}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>

                  <Box display="flex" justifyContent="end">
                    <Box mt="20px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        সংযোজন
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default EmlpoyeeList;
