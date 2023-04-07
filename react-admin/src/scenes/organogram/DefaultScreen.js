import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';

import 'reactflow/dist/base.css';

// import './tailwind-config.js';
import CustomNode from './components/CustomNode';
import './index.css';

import { Box, Grid, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AssignPositionBtn from './components/AssignPositionBtn';
import FullWidthGrid from './components/fullWidthGrid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import styled from '@emotion/styled';


// const [open, setOpen] = React.useState(false);

export default function defaultScreen(props) {
    const {setOpen, open} = props;
    // const [showResults, setShowResults] = React.useState(true);
    // const onClick = () => setShowResults(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div className="layoutflow" onClick={handleClickOpen}>
  
        {/* header  */}
  
        <Box m="20px" onClick={handleClose}>
          <Header
            title="অরগানোগ্রাম"
            subtitle="সামগ্রিক অরগানোগ্রাম"
          />
        </Box>
  
        {/* initial stage  */}
        {/* {showResults ? <FullWidthGrid gridTxt="মাউসের ডান বাটনে ক্লিক করুন" gridSizeXs="12"/> : null}; */}
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
              '& .MuiDialogContent-root': {
                  backgroundColor: "#99C4C8",
                },
          }}
        >
          <DialogContent>
            <AssignPositionBtn/>
          </DialogContent>
        </Dialog>
      </div>
    );
}
