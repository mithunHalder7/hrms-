import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import ApplyForm from './components/ApplyForm';

export default function LeaveApply() {
  return (
    <div>
        <Box m="80px">
          <Header
            title="ছুটির আবেদন"
          />
        <ApplyForm/>
        </Box>
    </div>
  )
}
