import React, {useState} from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import ApprovalTable from './components/ApprovalTable';
import useFetch from '../organogram/useFetch';



export default function Index(props) {
const chunks = props.postData;
  const usr_id = sessionStorage.getItem('act_usr_id');
  const usr_post_data = chunks?.filter((item) => item?.employee?.id == usr_id);
  const pos_id = usr_post_data[0]?.id;

  const initHistory = useFetch('http://localhost:5000/daily_attendance/subordinate_late_attendance/'+pos_id);

  const [approve_history, setHistory] = useState(initHistory);

  React.useEffect(() => {
    setHistory(initHistory);
}, [initHistory]);

    return (
        <div>
            <Box mx="60px">
                <Header
                    title="অধীনস্থদের দেরিতে প্রবেশ/দ্রুত অফিস ত্যাগ মওকুফ"
                />
                <ApprovalTable approve_history={approve_history}/>
            </Box>
        </div>
    )
}
