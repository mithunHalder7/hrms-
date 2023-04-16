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

function createData(empl_id, empl_name) {
    return { empl_id, empl_name };
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

    const [query_date, setDate] = useState("");
    const [entry_value, setEntryValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [exit_value, setExitValue] = React.useState(dayjs('2022-04-17T15:30'));

    const chunks = useFetch("http://localhost:5000/daily_attendance");

    const filtered = chunks?.filter((item) => item.employee.id == usr_id);
    // & dayjs(item.date) == query_date

    const nRows = props.approve_history?.map((item) => createData(item.employee_id, item.employee_name));

    const handleDate = (val) => {
        setDate(val);
        console.log(query_date);
    }

    function handleClick(event, id) {
        event.preventDefault();
    }
    function handleClickReject(event, id) {
        event.preventDefault();
       
    }
    function handleView(event, id){

    }
    // console.log(arr);

    return (
        <div>
            <TableContainer component={Paper} sx={{ minWidth: 550, m: 5 }}>
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
                                <TableCell align="center">
                                <Button size="small" onClick={(event) => handleView(event, row.leave_id)}><RemoveRedEyeOutlinedIcon/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
