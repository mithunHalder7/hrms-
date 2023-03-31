import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DataPos from '../all_data/Data_positions.json';
import DialogBtn from './DialogBtn';

const buttons = [
  <Button key="one" 
  sx={
    {
        padding:"10px",
        fontSize: "18px",
        borderRadius : "20px",
        background: "#25316D",
    }
  }
  onClick={()=>
{
    DataPos.map((item)=> console.log(item.id, item.pos_name))
    // {DialogBtn}
}}
  >পদ তৈরি</Button>,
];

export default function AssignEmployeeBtn() {
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
        {buttons}
      </ButtonGroup>
    </Box>
  );
}