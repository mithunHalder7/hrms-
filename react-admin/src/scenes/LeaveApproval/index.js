import React, {useState} from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import ApprovalList from './components/ApprovalList';
import useFetch from '../organogram/useFetch';
import { useEffect } from 'react';
import axios from 'axios';



export default function LeaveApproval(props) {

  const chunks = props.postData;
  const usr_id = sessionStorage.getItem('act_usr_id');
  const usr_post_data = chunks?.filter((item) => item?.employee?.id == usr_id);
  const pos_id = usr_post_data[0]?.id;

  const initHistory = useFetch('http://localhost:5000/leave/subordinate_leave/'+pos_id);

  const [leave_history, setHistory] = useState(initHistory);

    React.useEffect(() => {
        setHistory(initHistory);
    }, [initHistory]);


  const updateHistory = (prevData) =>
  {
    const FilteredHistory = leave_history.filter((item)=> item.leave_id != prevData);
    setHistory(FilteredHistory);
    // console.log(FilteredHistory);
  }

  return (
    <div>
        <Box mx="60px">
          <Header
            title="অধীনস্ত কর্মকর্তা/কর্মচারীদের ছুটি অনুমোদন/প্রত্যাখ্যান"
          />
          <ApprovalList leave_history={leave_history} updateHistory = {updateHistory}/>
        </Box>
    </div>
  )
}
