import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Box } from '@mui/material';



export default function DialogBtn(props) {
    const {reactbtn} = props;
    const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
          <Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
