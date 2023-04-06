import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function createData(leave_type, leave_start, leave_end, leave_status) {
    return { leave_type, leave_start, leave_end, leave_status};
}

const rows = [
    createData('ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", "অনুমোদিত"),
    createData('মেডিক্যাল ছুটি', "১১-০২-২০২৩", "০৫-০১-২০২৩", "অনুমোদিত"),
    createData('ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "১২-০২-২০২৩", "প্রত্যাখ্যাত"),
    createData('ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", "সিদ্ধান্তহীন"),
];



export default function LeaveStatus() {
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="আবেদনকৃত ছুটির স্ট্যাটাস"
                />
                <TableContainer component={Paper} sx={{ minWidth: 550, m:5}}>
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ছুটির ধরন</TableCell>
                                <TableCell align="left">ছুটির শুরু</TableCell>
                                <TableCell align="left">ছুটির শেষ</TableCell>
                                <TableCell align="left">ছুটির স্ট্যাটাস</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                row.leave_status == "অনুমোদিত" 
                                ?
                                <TableRow
                                    key={row.leave_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.leave_type}
                                    </TableCell>
                                    <TableCell align="left">{row.leave_start}</TableCell>
                                    <TableCell align="left">{row.leave_end}</TableCell>
                                    <TableCell align="left" sx={{color:"#6E9F65"}}>{row.leave_status}</TableCell>
                                </TableRow>
                                :
                                row.leave_status == "প্রত্যাখ্যাত" 
                                ?
                                <TableRow
                                    key={row.leave_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.leave_type}
                                    </TableCell>
                                    <TableCell align="left">{row.leave_start}</TableCell>
                                    <TableCell align="left">{row.leave_end}</TableCell>
                                    <TableCell align="left" sx={{color:"red"}}>{row.leave_status}</TableCell>
                                </TableRow>
                                :
                                row.leave_status == "সিদ্ধান্তহীন" 
                                ?
                                <TableRow
                                    key={row.leave_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.leave_type}
                                    </TableCell>
                                    <TableCell align="left">{row.leave_start}</TableCell>
                                    <TableCell align="left">{row.leave_end}</TableCell>
                                    <TableCell align="left" sx={{color:"#FBBC04"}}>{row.leave_status}</TableCell>
                                </TableRow>
                                :
                                <TableRow
                                    key={row.leave_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.leave_type}
                                    </TableCell>
                                    <TableCell align="left">{row.leave_start}</TableCell>
                                    <TableCell align="left">{row.leave_end}</TableCell>
                                    <TableCell align="left" sx={{color:"black"}}>{row.leave_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}


