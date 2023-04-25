import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import MyCalendar from './components/MyCalendar';
import CircleIcon from '@mui/icons-material/Circle';


export default function index() {
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="উপস্থিতির স্ট্যাটাস"
                />
                <Box mb={2}>
                    <div>
                    <span><CircleIcon sx={{color:"#34A853", ml:3}}/>সঠিক সময়ব্যাপী উপস্থিত</span>
                    <span><CircleIcon sx={{color:"#FBBC04", ml:3}}/>দেরিতে উপস্থিত/দ্রুত অফিস ত্যাগ</span>
                    <span><CircleIcon sx={{color:"#e98847", ml:3}}/>ছুটি</span>
                    </div>
                </Box>
                <MyCalendar/>
            </Box>
        </div>
    )
}
