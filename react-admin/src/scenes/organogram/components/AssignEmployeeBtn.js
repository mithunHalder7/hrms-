import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="one" 
  sx={
    {
        padding:"5px",
        fontSize: "18px",
        borderRadius : "20px",
        background: "#25316D",
    }
  }
  >পদ তৈরি</Button>,
  <Button key="two"
  sx={
    {
        padding:"5px",
        fontSize: "18px",
        borderRadius : "20px",
        background: "#25316D",
    }
  }>পদ অপসরণ</Button>,
  <Button key="three"
  sx={
    {
        padding:"5px",
        fontSize: "18px",
        borderRadius : "20px",
        background: "#25316D",
    }
  }>কর্মকর্তা/কর্মচারি নিয়োগ</Button>,
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