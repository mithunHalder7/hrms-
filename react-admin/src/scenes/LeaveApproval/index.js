import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import ApprovalList from './components/ApprovalList';


export default function LeaveApproval() {
  return (
    <div>
        <Box mx="60px">
          <Header
            title="অধীনস্ত কর্মকর্তা/কর্মচারীদের ছুটি অনুমোদন/প্রত্যাখ্যান"
          />
          <ApprovalList/>
        </Box>
    </div>
  )
}
