import * as React from 'react';
// import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import AssignEmployeeBtn from './AssignEmployeeBtn';

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


function CustomNode({ data }) {
      // console.log(myProp);
      
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        console.log("opened");
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
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
          <AssignEmployeeBtn/>
        </DialogContent>
      </Dialog>



      <div className="flex" onClick={handleClickOpen}>
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-black">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
          <div className="text-gray-300">{data.department}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
}

export default CustomNode;