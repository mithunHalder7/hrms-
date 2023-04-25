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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DateSelector from './DateSelector';
import FormLabel from '@mui/material/FormLabel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


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

function createData(empl_id, empl_name, leave_id) {
    return { empl_id, empl_name, leave_id};
}

const appBtn =
{
    background: "#99C4C8",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color: "black",
    mr: "15px"
}
const rejBtn =
{
    background: "#FFC18E",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color: "black",
}


const usr_id = sessionStorage.getItem('act_usr_id');
console.log(usr_id);

export default function ApprovalTable(props) {
    const [open, setOpen] = React.useState(false);
    const useLeaveInf = useFetch('http://localhost:5000/daily_attendance');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [query_date, setDate] = useState("");

    const [currentDate, setCurrentDate] = useState("");
    const [tvalue, settValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [lateCause, setLateCause] = useState("");

    const nRows = props.approve_history?.map((item) => createData(item.employee_id, item.employee_name, item.daily_attendance_id));
    // console.log(nRows);
    const notifyApproved = () => {toast.success("আবেদনটি অনুমোদিত হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};
    const notifyRejected = () => {toast.error("আবেদনটি প্রত্যাখ্যাত হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};


    const handleDate = (val) => {
        setDate(val);
        // console.log(query_date);
    }

    function handleClick(event, id) {
        event.preventDefault();
        const curr_leave = useLeaveInf?.filter((item)=> item.id == id);
        let cause_ = curr_leave?.map((item)=> item.late_cause);

        const obj = {
            "late_approval_status": 2,
            "late_cause": cause_[0]
        };
        axios.put('http://localhost:5000/daily_attendance_approve_reject/' + id, obj)
            .then(function (response) {
                console.log(response);
                // window.alert("Action performed successfully!");
                notifyApproved();
            })
            .catch(function (error) {
                console.log(error);
                window.alert("Action failed!");
            });
            props.updateHistory(id);
    }
    function handleClickReject(event, id) {
        event.preventDefault();
        const curr_leave = useLeaveInf?.filter((item)=> item.id == id);
        let cause_ = curr_leave?.map((item)=> item.late_cause);

        const obj = {
            "late_approval_status": 3,
            "late_cause": cause_[0]
        };
        axios.put('http://localhost:5000/daily_attendance_approve_reject/' + id, obj)
            .then(function (response) {
                console.log(response);
                // window.alert("Action performed successfully!");
                notifyRejected();
            })
            .catch(function (error) {
                console.log(error);
                window.alert("Action failed!");
            });
            props.updateHistory(id);

    }
    function handleView(event, id) {
        event.preventDefault();

        const curr_leave = useLeaveInf?.filter((item)=> item.id == id);
        const date_ = curr_leave?.map((item)=> item.date);
        let time_ = curr_leave?.map((item)=> item.office_entry_time);
        let cause_ = curr_leave?.map((item)=> item.late_cause);

        const dayjs = require('dayjs');
        let dateFormat = dayjs(date_).format('YYYY-MM-DD');

        const time_n = dateFormat+"T"+time_[0];
        console.log("useleave ",cause_[0]);

        setCurrentDate(date_);
        settValue(time_n);
        setLateCause(cause_[0]);
        handleClickOpen();
    }
    // console.log(arr);

    return (
        <div>
            <TableContainer component={Paper} sx={{ minWidth: 550, m: 5, p: 5 }}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold !important", display: "none" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold !important" }}>নাম</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold !important" }}>সিদ্ধান্ত</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold !important" }}>বিস্তারিত</TableCell>
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
                                <TableCell align="left">{row.empl_name}</TableCell>
                                <TableCell align="center">
                                    <Button size="small" sx={appBtn} onClick={(event) => handleClick(event, row.leave_id)}>অনুমোদন</Button>
                                    <Button size="small" sx={rejBtn} onClick={(event) => handleClickReject(event, row.leave_id)}>প্রত্যাখ্যান</Button>
                                </TableCell>
                                <TableCell align="center" sx={{color:"black"}}>
                                    <Button size="small" onClick={(event) => handleView(event, row.leave_id)}><RemoveRedEyeOutlinedIcon /></Button>
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
                    <DateSelector handleDate={handleDate} setDate ={currentDate}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="অফিস প্রবেশের সময়"
                        value={tvalue}
                        readOnly
                        sx={{
                            marginLeft:"50px",
                            marginBottom: "20px"
                        }}
                    />
                    </LocalizationProvider>
                    
                    <FormLabel sx={{my:5}}>দেরির কারণ/দ্রুত অফিস ত্যাগের কারণ</FormLabel>
                    <input
                    type="text"
                    value={lateCause}
                    readOnly
                    style={{display:"block"}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        বন্ধ করুন
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <ToastContainer/>
        </div>
    )
}
