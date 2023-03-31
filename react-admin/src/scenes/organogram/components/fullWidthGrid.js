import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
//   ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "#CE5B65",
  fontSize: "30px",
  alignContent: "center",
}));

export default function FullWidthGrid(props) {

    const {gridSizeXs, gridSizeMd, gridTxt} = props
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={gridSizeXs} md={gridSizeMd}>
          <Item sx={{height : "650px"}}>{gridTxt}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}