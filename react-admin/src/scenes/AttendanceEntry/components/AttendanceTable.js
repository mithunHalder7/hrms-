import React, { useState } from 'react';
import DateSelector from './DateSelector';
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
import dayjs from 'dayjs';
import useFetch from '../../organogram/useFetch';
import 'react-clock/dist/Clock.css';
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function createData(empl_id, empl_name) {
    return { empl_id, empl_name };
}

const rows = [
    createData(1, "dsadad", "dasdad", "dasd", "dsad"),
    createData(2, "dsadad", "dasdad", "dasd", "dsad"),
    createData(3, "dsadad", "dasdad", "dasd", "dsad"),
    createData(4, "dsadad", "dasdad", "dasd", "dsad"),
];
const appBtn =
{
    background: "#99C4C8",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color: "black",
    mr: "15px"
}
const appBtn2 =
{
    color: "#99C4C8",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    mr: "15px"
}

export default function AttendanceTable(props) {

    // const chunks = useFetch("http://localhost:5000/employee");
    const dayjs = require('dayjs');
    const nRows = props.chunks?.map((item) => createData(item.id, item.name));
    const att_history = props.daily_attendance;


    const [query_date, setDate] = useState("");
    const [exit_value, setExitValue] = React.useState([]);
    const [entry_value, setEntryValue] = React.useState([]);
    const notify = () => { toast.success("সফলভাবে সিস্টেমে গৃহীত হয়েছে!", { position: toast.POSITION.BOTTOM_RIGHT }) };

    const handleDate = (val) => {
        setDate(val);
    }

    function handleClick(event, id) {
        event.preventDefault();
        if(entry_value[id] == "" && exit_value[id] == "")
        {
            const obj = {
                "date": query_date,
	            "employee_id": id,
	            "late_status": 2

            }
            axios.post('http://localhost:5000/daily_attendance', obj)
                .then(function (response) {
                    console.log(response);
                    notify();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else
        {
            const obj = {
                "date": query_date,
                "office_entry_time": entry_value[id],
                "office_exit_time": exit_value[id],
                "employee_id": id
            }
            // console.log(obj);
            axios.post('http://localhost:5000/daily_attendance', obj)
                .then(function (response) {
                    console.log(response);
                    // window.alert("successfully applied!");
                    notify();
                })
                .catch(function (error) {
                    console.log(error);
                    // window.alert("failed request!!");
                });
        }

    }

    // console.log(arr);
    const handleEntryTimePicker = (time, id) => {
        if (time == null) {
            let arr = [...entry_value];
            arr[id] = "";
            setEntryValue(arr);
        }
        else {
            let arr = [...entry_value];
            arr[id] = time.format("HH:mm");
            setEntryValue(arr);
        }
    };
    const handleExitTimePicker = (time, id) => {
        if (time == null) {
            let arr = [...exit_value];
            arr[id] = "";
            setExitValue(arr);
        }
        else {
            let arr = [...exit_value];
            arr[id] = time.format("HH:mm");
            setExitValue(arr);
        }
    };
    return (
        <div>
            <DateSelector handleDate={handleDate} />
            <TableContainer component={Paper} sx={{ minWidth: 550, m: 5 }}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold !important", display: "none" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold !important" }}>কর্মকর্তা/কর্মচারির নাম</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold !important" }}>প্রবেশ</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold !important" }}>বাহির</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold !important" }}>সিদ্ধান্ত</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nRows?.map((row) => (
                            att_history?.find(x => x?.employee.id == row.empl_id && x?.date == query_date) ?
                                <TableRow
                                    key={row.empl_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ display: "none" }}>
                                        {row.empl_id}
                                    </TableCell>
                                    <TableCell align="left">{row.empl_name}</TableCell>
                                    <TableCell align="center">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker defaultValue={moment()}
                                                disableClock={true}
                                                showSecond={false}
                                                disabled={true}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>

                                    <TableCell align="center">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker defaultValue={moment()}
                                                disableClock={true}
                                                showSecond={false}
                                                disabled={true}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="small" sx={appBtn2} disabled={true}>সংরক্ষিত</Button>
                                    </TableCell>
                                </TableRow>
                                :
                                <TableRow
                                    key={row.empl_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ display: "none" }}>
                                        {row.empl_id}
                                    </TableCell>
                                    <TableCell align="left">{row.empl_name}</TableCell>
                                    <TableCell align="center">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker defaultValue={moment()}
                                                disableClock={true}
                                                showSecond={false}
                                                name={row.empl_id + "-starttime"}
                                                onChange={time => handleEntryTimePicker(time, row.empl_id)}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>

                                    <TableCell align="center">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker defaultValue={moment()}
                                                disableClock={true}
                                                showSecond={false}
                                                name={row.empl_id + "-endtime"}
                                                onChange={time => handleExitTimePicker(time, row.empl_id)} />
                                        </LocalizationProvider>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="small" sx={appBtn} onClick={(event) => handleClick(event, row.empl_id)}>সংরক্ষণ</Button>
                                    </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    )
}
