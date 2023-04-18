import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';
import { Formik, useFormik } from 'formik';


export default function DatePickerValue(props) {
    const [value, setValue] = React.useState(dayjs(props.setDate));


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
          label="তারিখ"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          readOnly
        />
        </LocalizationProvider>
    );
}