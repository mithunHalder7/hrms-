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
import PosData from '../all_data/positioned.json';
import { callbackify } from 'util';
import useFetch from '../useFetch';
import { useEffect, useState } from 'react';
import TextField  from '@mui/material/TextField';
import usePost from '../usePost';


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
        বিভাগ: "",
      },
      onSubmit: (values) => {
        // console.log(values.পদের_নাম);
        const obj = {
          name: values.পদের_নাম,
          department_id: values.বিভাগ.toString(),
          parent_id: "-1",
        };
        
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(obj),
        }
        fetch("http://localhost:5000/office_post", options)
          .then((response) => response.json())
          .then((json) => console.log(json));

        // console.log(pName);
        // const obj = {
        //   id: values.পদের_নাম.toString(),
        //   type: 'custom',
        //   data: { name: '', job: pName.toString(), emoji: '', department: values.বিভাগ },
        //   position: { x: 0, y: 0 },
        // };
        // const edge = {
        //   id: values.পদের_নাম.toString(),
        //   source: values.পদের_নাম.toString(),
        //   target: '-1',
        //   type: 'smoothstep',
        //   animated: true,
        // }

        window.localStorage.setItem('nodes', JSON.stringify([obj]));
        // window.localStorage.setItem('edges', JSON.stringify([edge]));

        // console.log(window.localStorage.getItem('edges'));
        window.location.reload();
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
          <Box sx={{ minWidth: 120 }} autoComplete="off">
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
    </Box>
  );
}