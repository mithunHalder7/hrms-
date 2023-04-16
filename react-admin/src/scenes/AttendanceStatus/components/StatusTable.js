import React, { useState } from 'react';
import DateSelector from '../../AttendanceEntry/components/DateSelector';
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


function createData(empl_id, empl_start, empl_end, empl_stat) {
    return {empl_id, empl_start, empl_end, empl_stat};
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

const usr_id = sessionStorage.getItem('act_usr_id');
console.log(usr_id);

export default function AttendanceTable() {

    const [query_date, setDate] = useState("");
    const [entry_value, setEntryValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [exit_value, setExitValue] = React.useState(dayjs('2022-04-17T15:30'));

    const chunks = useFetch("http://localhost:5000/daily_attendance");

    const filtered = chunks?.filter((item)=> item.employee.id == usr_id);
    // & dayjs(item.date) == query_date

    const nRows = filtered?.map((item)=> createData(item.employee.id, item.office_entry_time, item.office_exit_time, item.late_approval_status));

    const handleDate = (val) => {
        setDate(val);
        console.log(query_date);
    }

    function handleClick(event, id) {
        event.preventDefault();
    }

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
        </div>
    )
}
