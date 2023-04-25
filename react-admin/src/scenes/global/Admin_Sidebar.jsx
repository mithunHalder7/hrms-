import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import SVGComponent from "./SVGComponent";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MediationOutlinedIcon from "@mui/icons-material/MediationOutlined";
import AttendanceEntry from '../AttendanceEntry';
import TreeItem from '@mui/lab/TreeItem/TreeItem';
import TreeView from '@mui/lab/TreeView/TreeView';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScheduleIcon from '@mui/icons-material/Schedule';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Admin_Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          position: "absolute",
          left: "15px",
          top: "14px",
          background: "#F7FBFC",
          boxShadow: "0px 4px 35px -3px rgba(0, 0, 0, 0.25)",
          borderRadius: "55px",
          width:"280px"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          backgroundColor: "#F7FBFC",
          borderRadius: "60px",
          textAlign:"center"
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .MuiTreeItem-content":
        {
          padding:"15px",
          textAlign:"center",
          background: "none",
          color:"black"
        },
        "& .MuiTreeItem-content:hover":
        {
          color: "#868dfb !important",
          background: "transparent",

        },
        "& .MuiTreeItem-content:active":
        {
          color: "#868dfb !important",
          background: "none",

        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
        <MenuItem>
            {
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ml: "30px",
                  mt: "25px",
                }}
              >
                <SVGComponent />
              </Box>
            }
          </MenuItem>

          <Box >
          <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 300}}
            >
            <Item
              title="ড্যাশবোর্ড"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
            <Item
              title="অরগানোগ্রাম"
              to="/organogram"
              icon={<MediationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="কর্মকর্তা/কর্মচারী"
              to="/Employee"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <TreeItem nodeId="1" label="উপস্থিতি">
              <Item
                title="উপস্থিতি সংরক্ষণ"
                to="/AttendanceEntry"
                icon={<ContentPasteSearchIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              </TreeItem>
              
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            </TreeView>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Admin_Sidebar;
