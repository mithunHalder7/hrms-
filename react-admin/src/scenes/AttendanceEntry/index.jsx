import React from 'react'
import { Box } from '@mui/material';
import Header from '../../components/Header';
import Calendar from './components/Calender';
import AttendanceTable from './components/AttendanceTable';


export default function Index() {
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="উপস্থিতি সংরক্ষণ"
                />
                <AttendanceTable/>
            </Box>
        </div>
    )
}

