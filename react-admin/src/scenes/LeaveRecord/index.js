import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import RecordForm from "./components/RecordForm";

export default function LeaveRecord() {
  return (
    <div>
        <Box mx="60px">
          <Header
            title="ছুটির রেকর্ড"
          />
        <RecordForm/>
        </Box>
    </div>
  )
}
