import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import useFetch from '../../organogram/useFetch';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DateSelector from './DateSelector';
import FormLabel from '@mui/material/FormLabel'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


function createData(empl_id, empl_start, empl_end, empl_stat) {
    return { empl_id, empl_start, empl_end, empl_stat };
}

const appBtn =
{
    background: "#99C4C8",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color: "black",
    mr: "15px"
}

const usr_id = sessionStorage.getItem('act_usr_id');
console.log(usr_id);

export default function AttendanceTable() {
    const [open, setOpen] = React.useState(false);
    const [query_date, setDate] = useState("");
    const [entry_value, setEntryValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [exit_value, setExitValue] = React.useState(dayjs('2022-04-17T15:30'));

    const chunks = useFetch("http://localhost:5000/daily_attendance");
    // chunks?.map((item)=> console.log(item.date));
    const filtered = chunks?.filter((item) => (item.employee.id == usr_id) & item.date == query_date);
    // & dayjs(item.date) == query_date

    const nRows = filtered?.map((item) => createData(item.employee.id, item.office_entry_time, item.office_exit_time, item.late_approval_status));

    const handleDate = (val) => {
        setDate(val);
        console.log(query_date);
    }

    function handleClick(event, id) {
        event.preventDefault();
        handleClickOpen();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [currentDate, setCurrentDate] = useState("");
    const [tvalue, settValue] = React.useState(dayjs('2022-04-17T15:30'));

    // console.log(arr);

    return (
        <div>
            <DateSelector handleDate={handleDate} />
            <TableContainer component={Paper} sx={{ minWidth: 550, m: 5 }}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold !important", display: "none" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold !important" }}>প্রবেশ</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold !important" }}>বাহির</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold !important" }}>স্ট্যাটাস</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold !important" }}>সিদ্ধান্ত</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nRows?.map((row) => (
                            <TableRow
                                key={row.empl_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ display: "none" }}>
                                    {row.empl_id}
                                </TableCell>
                                <TableCell align="left">{row.empl_start}</TableCell>
                                <TableCell align="left">{row.empl_end}</TableCell>
                                <TableCell align="left">{row.empl_stat}</TableCell>
                                <TableCell align="center">
                                    {row.empl_stat == 1 ? <Button size="small" sx={appBtn} onClick={(event) => handleClick(event, row.empl_id)}>আবেদন</Button> : ""}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    দেরিতে প্রবেশের তথ্য
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <DateSelector handleDate={handleDate} setDate={currentDate} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="অফিস প্রবেশের সময়"
                            value={tvalue}
                            sx={{
                                marginBottom: "20px",
                                display: "block"
                            }}
                        />
                    </LocalizationProvider>

                    <FormLabel sx={{ my: 5 }}>দেরির কারণ/দ্রুত অফিস ত্যাগের কারণ</FormLabel>
                    <input
                        type="text"
                        style={{ display: "block" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        বন্ধ করুন
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
