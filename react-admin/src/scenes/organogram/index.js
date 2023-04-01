import React, { useCallback } from 'react';
import 'reactflow/dist/base.css';
import './index.css';
import { Box, Grid, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import DataPos from './all_data/positioned';
import DefaultScreen from './DefaultScreen';
import OrganogramScene from './OrganogramScreen';
import AsholOrganogram from './AsholOrganogram';


const Organogram = () => {
  const [open, setOpen] = React.useState(false);
// window.localStorage.clear();
  // console.log(window.localStorage.length);
  if(window.localStorage.length === 0)
  {
    return <DefaultScreen open={open} setOpen = {setOpen}/>
  }

  else 
  {
    return (
      // <OrganogramScene/>
      <AsholOrganogram/>
    );

  }
  
};

export default Organogram;
      

  