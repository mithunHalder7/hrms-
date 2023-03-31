import React, { useCallback } from 'react';
import 'reactflow/dist/base.css';
import './index.css';
import { Box, Grid, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import positionedData from './all_data/positioned.json';
import DefaultScreen from './DefaultScreen';
import OrganogramScene from './OrganogramScreen';



const Organogram = () => {
  const [open, setOpen] = React.useState(false);

  if(positionedData.length === 0)
  {
    return <DefaultScreen open={open} setOpen = {setOpen}/>
  }

  else 
  {
    return (
      <OrganogramScene/>
    );

  }
  
};

export default Organogram;
      

  