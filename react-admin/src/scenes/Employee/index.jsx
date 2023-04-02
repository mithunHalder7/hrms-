import { Box, TextField, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect, React } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";

import Header from "../../components/Header";
import { mockDataEmployee } from "../../data/mockData";
import ModalForm from "./AddEmployee";
import EditForm from "./EditForm";

const EmlpoyeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [employeeData, setEmployeeData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/employee', {
  //     params: {
  //       fields: ['id','name', 'phone', 'address_curr']
  //     }
  //   })
  //   .then(response => setEmployeeData(response.data))
  //   .catch(error => console.error(error));
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/employee").then((response) => {
      setEmployeeData(response.data);
    });
  }, []);

  const handleShowEmployee = () => {
    // Add new employee to the server
    axios
      .get("http://localhost:5000/employee")
      .then((response) => setEmployeeData(response.data))
      .catch((error) => console.error(error));
  };

  const handleShowAfterEdit = () => {
    // Edit new employee list
    axios
      .get("http://localhost:5000/employee")
      .then((response) => setEmployeeData(response.data))
      .catch((error) => console.error(error));
  };

  //Modal for Edit Finctionality
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
    console.log(row);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Table Column names
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "user_name", headerName: "নাম" },
    {
      field: "phone",
      headerName: "ফোন",
      flex: 1,
      disableClickEventBubbling: true,
    },

    {
      field: "address_curr",
      headerName: "এড্রেস",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="কর্মকর্তা/কর্মচারী "
        subtitle="কর্মকর্তা/কর্মচারীর তালিকা"
      />
      <Box m="40px 0 0 0" height="75vh">
        <ModalForm onShowDataAfterAdd={handleShowEmployee} />

        <DataGrid
          rows={employeeData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Modal open={showModal} onClose={handleCloseModal}>
        <EditForm
          row={selectedRow}
          onClose={handleCloseModal}
          onShowDataAfterEdit={handleShowAfterEdit}
        />
      </Modal>
    </Box>
  );
};

export default EmlpoyeeList;
