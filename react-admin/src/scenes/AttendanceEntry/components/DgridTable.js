import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { GridToolbar } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
// const rows = [
//   { id: 1, name: 'Snow'},
//   { id: 2, name: 'Lannister'},
//   { id: 3, name: 'Lannister'},
//   { id: 4, name: 'Stark'},
// ];
const ExitDate = () => {
    const [exit_value, setExitValue] = React.useState('00:00');
  
    return (
        <TimePicker onChange={setExitValue} value={exit_value} disableClock={true}/>
    );
  };

const columns = [
    { field: 'id', headerName: 'ID', width: 90},
    { field: 'name', headerName: 'নাম', width: 260 },
    {
        field: "entry",
        headerName: "প্রবেশ",
        type:"timeField",
        editable:true,
      },
      {
        field: "exit",
        headerName: "বাহির",
        type:"timeField",
        editable:true,
      },
  ];
  function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
      () =>
        columns.concat({
          field: "__HIDDEN__",
          width: 0,
          renderCell: (params) => {
            apiRef.current = params.api;
            return null;
          }
        }),
      [columns]
    );
  
    return { apiRef, columns: _columns };
  }


export default function DgridTable(props) {

    let nRow = props.chunks?.map((item)=> 1?{id: item.id, name: item.name, entry:'', exit:''}:{});

    const onRowsSelectionHandler = (ids) => {

        const selectedRowsData = ids.map((id) => nRow.find((row) => row.id === id));
        console.log(selectedRowsData);
      };

      const { apiRef, columns } = useApiRef();
const handleClickButton = () => {
  console.log(apiRef.current.getRowModels());
};
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={nRow}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
      <Button onClick={handleClickButton}>
      Show data
    </Button>
    </Box>
  );
}