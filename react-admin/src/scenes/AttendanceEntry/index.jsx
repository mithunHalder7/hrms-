import React, { useState } from 'react'
import { Box } from '@mui/material';
import Header from '../../components/Header';
import Calendar from './components/Calender';
import AttendanceTable from './components/AttendanceTable';

import useFetch from '../organogram/useFetch';
export default function Index() {
    const [employee_rows, SetRows] = useState("");

    const chunks = useFetch("http://localhost:5000/employee");

    React.useEffect(() => {
        SetRows(chunks);
    }, [chunks]);

    const handleRows = (id)=>
    {
        const newRows = chunks?.filter((item)=> item.id != id);
        SetRows(newRows);
    }
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="উপস্থিতি সংরক্ষণ"
                />
                <AttendanceTable employeeInfo={chunks}/>
            </Box>
        </div>
    )
}

