import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import TextField from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DataPost from '../all_data/Data_positions.json';

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


const buttons = [
  <Button key="one"
    sx={
      {
        padding: "10px",
        fontSize: "18px",
        borderRadius: "20px",
        background: "#25316D",
      }
    }
    value="1"

  >পদ তৈরি</Button>,
];

const schemaTypeSelectionHandle = (event) => {
  // console.log('key: ', $(event.target).data('key'));
  console.log('key: ', event.target.value);
}

export default function AssignEmployeeBtn() {
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
        console.log(values);
      }
    }
  );

  const [post, setPost] = React.useState('');
  const [dept, setDept] = React.useState('');

  const handleChange1 = (event) => {
    setPost(event.target.value);
  };
  const handleChange2 = (event) => {
    setDept(event.target.value);
  };

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
              padding: "10px",
              fontSize: "18px",
              borderRadius: "20px",
              background: "#25316D",
            }
          }
          value="1"
          onClick={handleClickOpen}
        >পদ তৈরি</Button>
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
              <InputLabel id="post_name">পদের নাম</InputLabel>
              <Select
                labelId="post_name"
                id="post_name"
                value={formik.values.পদের_নাম}
                label="পদের নাম"
                onChange={formik.handleChange}
                name= "পদের_নাম"
              >
                {DataPost.map((info)=> <MenuItem value={info.id}>{info.name}</MenuItem>)}
              </Select>
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
                {DataPost.map((info)=> <MenuItem value={info.department.id}>{info.department.name}</MenuItem>)}
              </Select>

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