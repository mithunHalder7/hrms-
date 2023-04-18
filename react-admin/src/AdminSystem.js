import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
import Topbar from "./scenes/global/Topbar";
import { Routes } from 'react-router-dom';
import Organogram from './scenes/organogram';
import EmlpoyeeList from './scenes/Employee';
import Admin_Sidebar from './scenes/global/Admin_Sidebar';
import AttendanceEntry from './scenes/AttendanceEntry';
import AttendanceTime from './scenes/AttendanceTime';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

window.localStorage.setItem('upAtt', JSON.stringify(0));
// window.localStorage.clear();
export default function EmployeeSystem() {

  return (
    <div className="app">
        <Admin_Sidebar />
        <main className="content">
        <Topbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organogram" element={<Organogram />} />
            <Route path="/Employee" element={<EmlpoyeeList />} />
            <Route path="/AttendanceEntry" element={<AttendanceEntry />} />
            <Route path="/AttendanceTime" element={<AttendanceTime />} />
            {/* <Route path="/organogram" element={<Organogram />} /> */}
            {/* <Route path="/Employee" element={<EmlpoyeeList />} /> */}
            
          </Routes>
        </main>
      </div>
  )
}
