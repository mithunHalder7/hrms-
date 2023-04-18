import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import StatusTable from './components/StatusTable';




export default function index() {
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="উপস্থিতির স্ট্যাটাস"
                />
                <StatusTable/>
            </Box>
        </div>
    )
}
