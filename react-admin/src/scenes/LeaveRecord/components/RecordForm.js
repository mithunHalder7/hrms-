import React from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../../../components/Header';



function createData(leave_type, leave_start, leave_end) {
  return {leave_type, leave_start, leave_end};
}

const rows = [
  createData('ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩","০৫-০১-২০২৩"),
  createData('মেডিক্যাল ছুটি', "১১-০২-২০২৩","০৫-০১-২০২৩"),
  createData('ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩","১২-০২-২০২৩"),
  createData('ক্যাজুয়াল ছুটি', "০৫-০১-২০২৩","০৫-০১-২০২৩"),
];


const sxButton =
{
    background: "#99C4C8", color: "black", border: "none", wordSpacing: "5px", textAlign: "left",
    borderRadius: "23px",
    "& .MuiButtonBase-root:hover":
    {
        background: "black !important",
    }
}

export default function RecordForm() {
    return (
        <div>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                    <label htmlFor="leave_start">ছুটির  শুরু</label>
                    <input
                        type="date"
                        id="leave_start"
                        name="leave_start"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, mx: 10, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                    <label htmlFor="leave_start">ছুটির শেষ</label>
                    <input
                        type="date"
                        id="leave_end"
                        name="leave_end"
                    />
                </FormControl>
                <FormControl sx={{ mx: 10, my: 2.5, minWidth: 210, textAlign: "left" }}>
                    <Button variant="raised" component="label" sx={sxButton}>
                        <FilterAltSharpIcon />
                        ফিল্টার
                    </Button>
                </FormControl>
            </Box>
            <Box sx={{my:10}}>
            <Header title="নিজের ভোগকৃত ছুটির তালিকা"/>
                <TableContainer component={Paper} sx={{ maxWidth: 450 }}>
                    <Table sx={{ maxWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ছুটির ধরন</TableCell>
                                <TableCell align="left">ছুটির শুরু</TableCell>
                                <TableCell align="left">ছুটির শেষ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.leave_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.leave_type}
                                    </TableCell>
                                    <TableCell align="left">{row.leave_start}</TableCell>
                                    <TableCell align="left">{row.leave_end}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}
