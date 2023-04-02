import { useState, useEffect } from "react";
import * as React from "react";
import {
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axios from "axios";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const initialState = {
  address_perm: "",
  dob: null,
  address_curr: "",
  marital_status_id: "",
  phone: "",
  name: "",
  religion_id: "",
  user_name: "",
};

const ModalForm = (props) => {
  const [religions, setReligions] = useState([]);
  const [martualStatus, setMaritualStatus] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/religion").then((response) => {
      setReligions(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/marital_status").then((response) => {
      setMaritualStatus(response.data);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleUserNameChange = (e) => {
    setFormData({
      ...formData,
      user_name: e.target.value,
    });
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleUserPhoneNoChange = (e) => {
    setFormData({
      ...formData,
      phone: e.target.value,
    });
  };

  const handleUserCurrentAddressChange = (e) => {
    setFormData({
      ...formData,
      address_curr: e.target.value,
    });
  };

  const handlePermanentAddressChange = (e) => {
    setFormData({
      ...formData,
      address_perm: e.target.value,
    });
  };

  const handleDobChange = (e) => {
    setFormData({
      ...formData,
      dob: e.target.value,
    });
  };

  const handleMartualStatusChange = (e) => {
    setFormData({
      ...formData,
      marital_status_id: e.target.value,
    });
  };

  const handleReligionChange = (e) => {
    setFormData({
      ...formData,
      religion_id: e.target.value,
    });
  };

  

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/employee', formData)
      .then(response => console.log(response))
      .catch(error => console.error(error));
      setFormData(initialState);
      props.onShowDataAfterAdd();
      // window.location.reload();
    };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   e.target.reset();
  //   setFormData(initialState);
  // };

  const validate = (data) => {
    const errors = {};
    if (!data.USER_NAME) {
      errors.USER_NAME = "Username is required";
    }
    if (!data.NAME) {
      errors.NAME = "Name is required";
    }
    if (!data.PHONE) {
      errors.PHONE = "Phone number is required";
    }
    if (!data.dob) {
      errors.dob = "Date of birth is required";
    }
    if (!data.currentAddress) {
      errors.currentAddress = "Current address is required";
    }
    if (!data.permanentAddress) {
      errors.permanentAddress = "Permanent address is required";
    }
    if (!data.maritalStatus) {
      errors.maritalStatus = "Marital status is required";
    }
    if (!data.religion) {
      errors.religion = "Religion is required";
    }
    if (!data.email) {
      errors.email = "Emial is Required";
    }
    return errors;
  };

  return (
    <Box>
      <Box m={1} display="flex" justifyContent="flex-end" alignItem="flex-end">
        <p style={{ color: "black", padding: "10px" }}>এমপ্লয়ী যুক্ত করুন</p>

        <IconButton
          color="success"
          aria-label="add to shopping cart"
          onClick={handleOpen}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            bgcolor: "white",
            width: "75%",
            height: "100%",
            margin: "auto",
            boxShadow: 3,
            borderRadius: 2,
            display: "block",
            overflow: "scroll",
            color: "black",
            padding: "20px",
          }}
        >
          <Header sx={{ color: "success" }} title="কর্মকর্তা/কর্মচারী সংযোজন" />

          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                gridColumn: "span 4",
                color: "black",
              }}
            >
              <TextField
                variant="standard"
                label="Username"
                name="user_name"
                value={formData.user_name}
                onChange={handleUserNameChange}
                fullWidth
                required
                error={!!errors.user_name}
                helperText={errors.user_name}
              />

              <TextField
                variant="standard"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                variant="standard"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleUserPhoneNoChange}
                fullWidth
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <TextField
                variant="standard"
                label="Current Address"
                name="address_curr"
                value={formData.address_curr}
                onChange={handleUserCurrentAddressChange}
                fullWidth
                required
                error={!!errors.currentAddress}
                helperText={errors.currentAddress}
              />

              <TextField
                variant="standard"
                label="Permanent Address"
                name="ddress_perm"
                value={formData.address_perm}
                onChange={handlePermanentAddressChange}
                fullWidth
                required
                error={!!errors.permanentAddress}
                helperText={errors.permanentAddress}
              />

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Religion
                </InputLabel>
                <Select
                  labelId="religion-label"
                  id="religion"
                  name="religion_id"
                  value={formData.religion_id}
                  onChange={handleReligionChange}
                  fullWidth
                  required
                >
                  {religions.map((religion) => (
                    <MenuItem key={religion.id} value={religion.id}>
                      {religion.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Marital Status
                </InputLabel>
                <Select
                  labelId="religion-label"
                  id="religion"
                  name="marital_status_id"
                  value={formData.marital_status_id}
                  onChange={handleMartualStatusChange}
                  fullWidth
                  required
                >
                  {martualStatus.map((marital) => (
                    <MenuItem key={marital.id} value={marital.id}>
                      {marital.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <label htmlFor="myDate">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDobChange}
                />
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end">
              <Box mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  সংযোজন
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalForm;
