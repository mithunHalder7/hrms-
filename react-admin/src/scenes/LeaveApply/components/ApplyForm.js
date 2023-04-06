import React from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';




const sxButton = 
{
    background:"transparent", color:"black", border:"none", wordSpacing:"5px", borderBottom: "2px solid #99C4C8", textAlign:"left",

}

export default function ApplyForm() {
    return (
        <div>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                    <label htmlFor="leave_start">ছুটির  শুরু</label>
                    <input
                        type="date"
                        id="leave_start"
                        name="leave_start"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, mx: 10, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                    <label htmlFor="leave_start">ছুটির শেষ</label>
                    <input
                        type="date"
                        id="leave_end"
                        name="leave_end"
                    />
                </FormControl>
            </Box>
            <Box>
                <FormControl sx={{ mx: 1, my: 5, minWidth: 210 }}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        ছুটির ধরন
                    </InputLabel>
                    <NativeSelect
                        defaultValue={"ক্যাজুয়াল ছুটি"}
                        inputProps={{
                            name: 'leave_type',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={"ক্যাজুয়াল ছুটি"}>ক্যাজুয়াল ছুটি </option>
                        <option value={"মেডিক্যাল ছুটি"}>মেডিক্যাল ছুটি </option>
                        <option value={"অর্জিত ছুটি"}>অর্জিত ছুটি</option>
                    </NativeSelect>
                </FormControl>
                <FormControl sx={{ mx: 10, my: 6.5, minWidth: 210, textAlign:"left" }}>
                        <Button variant="raised" component="label" sx={sxButton}>
                        <AttachFileSharpIcon/>
                            সংযুক্তি
                            <input multiple type="file" hidden/>
                        </Button>
                </FormControl>
            </Box>
        </div>
    )
}
