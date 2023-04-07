import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DataPost from '../all_data/Data_positions.json';
import TextField from '@mui/material/TextField';
import useFetch from '../useFetch';
import axios from 'axios';
import AddEmpForm from './AddEmpForm';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};





function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}



export default function AssignEmployeeBtn() {


  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  let departments = useFetch("http://localhost:5000/department");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  let parentId = JSON.parse(window.localStorage.getItem('parent'));
  let parentPos = JSON.parse(window.localStorage.getItem('parent_pos'));

  const [openAddEmp, setOpenAddEmp] = React.useState(false);
  const handleAddEmpOpen = () => {

    setOpenAddEmp(true);
  };

  const handleAddEmpClose = () => {
    setOpenAddEmp(false);
  };

  const formik = useFormik(
    {
      initialValues: {
        পদের_নাম: "",
        বিভাগ: "",
      },
      onSubmit: (values) => {
        const obj = {
          "department_id": values.বিভাগ,
          "parent_id": parseInt(parentId),
          "name": values.পদের_নাম,
        };
        // console.log(JSON.stringify(obj));
        // const handleSub = async(e)=>
        // {
        //   e.preventDefault();
        //   try{
        //     const resp = await axios.post('http://localhost:5000/office_post', JSON.stringify(obj));
        //     console.log(resp.data);
        //   }catch(error){
        //     console.log(error.response)
        //   }
        // };
        // handleSub();
        axios.post('http://localhost:5000/office_post', obj)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(window.localStorage.getItem('user'));
        window.location.reload();
        // window.alert("Added successfully!");
        // window.localStorage.clear();
      }
    }
  );


  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        <Button key="one"
          sx={
            {
              padding: "5px",
              fontSize: "18px",
              borderRadius: "20px",
              background: "#25316D",
            }
          }
          onClick={handleClickOpen}
        >পদ তৈরি</Button>
        <Button key="two"
          sx={
            {
              padding: "5px",
              fontSize: "18px",
              borderRadius: "20px",
              background: "#25316D",
            }
          }>পদ অপসরণ</Button>
        <Button key="three"
          sx={
            {
              padding: "5px",
              fontSize: "18px",
              borderRadius: "20px",
              background: "#25316D",
            }
          }
          onClick={handleAddEmpOpen}
        >কর্মকর্তা/কর্মচারি নিয়োগ</Button>
      </ButtonGroup>



      {/* ==================================================================create post dialog=================================================================*/}


      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{
          '& .MuiDialogContent-root': {
            backgroundColor: "#99C4C8",
          },
        }}
      >
        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <form onSubmit={formik.handleSubmit}>

              <FormControl fullWidth>

                <TextField id="outlined-basic" label="পদের নাম" variant="outlined" value={formik.values.পদের_নাম} onChange={formik.handleChange} name="পদের_নাম" />

              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="dept">বিভাগ</InputLabel>
                <Select
                  labelId="dept"
                  id="dept"
                  value={formik.values.বিভাগ}
                  label="বিভাগ"
                  name="বিভাগ"
                  onChange={formik.handleChange}
                >
                  {departments.map((info) => <MenuItem value={info.id}>{info.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl>
                <ButtonGroup variant="contained" aria-label="button group" sx={{ m: "10px" }}>
                  <Button variant="contained" color='success' type='submit'>প্রয়োগ</Button>
                  <Button variant="contained" color='error' onClick={handleClose} sx={{ ml: "auto" }}>বাতিল</Button>
                </ButtonGroup>
              </FormControl>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ===================================================add employee btn =========================================================== */}


      <BootstrapDialog
        onClose={handleAddEmpClose}
        aria-labelledby="customized-dialog-title"
        open={openAddEmp}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleAddEmpClose}>
          {parentPos} পদে কর্মকর্তা/কর্মচারি সংযুক্ত করুন
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <TextField
              id="search"
              type="search"
              label="Search"
              value={searchTerm}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Typography gutterBottom>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddEmpClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}