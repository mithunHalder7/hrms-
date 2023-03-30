import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { Box, Typography, useTheme } from "@mui/material";

export default function Organogram() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return
  (
    <Box m="20px">
    <Header
      title="কর্মকর্তা/কর্মচারী "
      subtitle="কর্মকর্তা/কর্মচারীর তালিকা"
    />
  )
}
