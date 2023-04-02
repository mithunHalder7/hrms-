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
import TextField  from '@mui/material/TextField';
import useFetch from '../useFetch';
import axios from 'axios';

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

const uniqueDep = [...new Set(DataPost.map((items)=> items.department.name))];
// console.log(uniqueDep);

const getPosName = [...new Set(DataPost.map((items)=> items.name))];


export default function AssignEmployeeBtn() {

  let departments = useFetch("http://localhost:5000/department");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const formik = useFormik(
    {
      initialValues: {
        পদের_নাম: "",
        বিভাগ : "",
      },
      onSubmit:(values)=>{
        let parentId = JSON.parse(window.localStorage.getItem('parent'));
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
          }>কর্মকর্তা/কর্মচারি নিয়োগ</Button>
      </ButtonGroup>


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

                <TextField id="outlined-basic" label="পদের নাম" variant="outlined" value={formik.values.পদের_নাম} onChange={formik.handleChange} name="পদের_নাম"/>

              </FormControl>

            <FormControl fullWidth>
            <InputLabel id="dept">বিভাগ</InputLabel>
              <Select
                labelId="dept"
                id="dept"
                value={formik.values.বিভাগ}
                label="বিভাগ"
                name= "বিভাগ"
                onChange={formik.handleChange}
              >
                {departments.map((info)=> <MenuItem value={info.id}>{info.name}</MenuItem>)}
              </Select>
              </FormControl>
              <FormControl>
              <ButtonGroup variant="contained" aria-label="button group" sx={{m : "10px"}}>
              <Button variant="contained" color='success' type='submit'>প্রয়োগ</Button>
              <Button variant="contained" color='error' onClick={handleClose} sx={{ml:"auto"}}>বাতিল</Button>
              </ButtonGroup>
            </FormControl>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}