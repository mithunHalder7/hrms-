import React from 'react'
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InsertDriveFileSharpIcon from '@mui/icons-material/InsertDriveFileSharp';
import Button from '@mui/material/Button';


function createData(leave_applicant, leave_type, leave_start, leave_end, leave_attatchment) {
    return { leave_applicant, leave_type, leave_start, leave_end, leave_attatchment };
}

const rows = [
    createData('মোঃ শাখন', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", ""),
    createData('সিয়াম আহমেদ', 'মেডিক্যাল ছুটি', "১১-০২-২০২৩", "০৫-০১-২০২৩", ""),
    createData('মনজুরুল হক', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "১২-০২-২০২৩", ""),
    createData('দেবরাজ সরকার', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", ""),
    createData('এলেন চাকমা', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", ""),
    createData('উম্মে কুলসুম বিন্তি', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", ""),
    createData('শামীমা বিনতে রহমান', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", ""),
    createData('হিমানী ঘোষ', 'ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩", "০৫-০১-২০২৩", ""),
];

const appBtn = 
{
    background: "#99C4C8",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color:"black",
    mr:"15px"
}
const rejBtn = 
{
    background: "#FFC18E",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color:"black",
}

export default function ApprovalList() {
    return (
        <Box mx="60px">
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>আবেদনকারী</TableCell>
                            <TableCell align="left">ছুটির ধরন</TableCell>
                            <TableCell align="left">ছুটির শুরু</TableCell>
                            <TableCell align="left">ছুটির শেষ</TableCell>
                            <TableCell align="left">সংযুক্তি</TableCell>
                            <TableCell align="center">সিদ্ধান্ত</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.leave_applicant}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.leave_applicant}
                                </TableCell>
                                <TableCell align="left">{row.leave_type}</TableCell>
                                <TableCell align="left">{row.leave_start}</TableCell>
                                <TableCell align="left">{row.leave_end}</TableCell>
                                <TableCell align="left">
                                <IconButton aria-label="delete" value={row.leave_attatchment}>
                                    <InsertDriveFileSharpIcon />
                                </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <Button size="small" sx={appBtn}>অনুমোদন</Button>
                                    <Button size="small" sx={rejBtn}>প্রত্যাখ্যান</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}


