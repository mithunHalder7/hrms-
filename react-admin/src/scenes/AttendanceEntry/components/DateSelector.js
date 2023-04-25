import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';
import { Formik, useFormik } from 'formik';


export default function DatePickerValue(props) {
    const [value, setValue] = React.useState("");


    const dateChange = (event)=>{
        event.preventDefault();
        setValue(event.target.value);
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl sx={{ m: 1, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                <label htmlFor="att_date">Date</label>
                <input
                    type="date"
                    id="att_date"
                    name="att_date"
                    format="dd-mm-yyyy"
                    placeholder="dd-mm-yyyy"
                    value={value}
                    onChange={dateChange}
                    onClick={props.handleDate(dayjs(value).format('MM/DD/YYYY'))}
                />
            </FormControl>
        </LocalizationProvider>
    );
}