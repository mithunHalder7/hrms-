// import React from "react";
// import { TextField, Box, Button } from "@mui/material";
// import Modal from "@mui/material/Modal";
// import IconButton from "@mui/material/IconButton";
// import AddIcon from "@mui/icons-material/Add";
// import { Formik } from "formik";
// import * as yup from "yup";
// import Header from "../../components/Header";

// const ModalAddEmployee = () => {
//   //Modal ADD
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   //selectbox values
//   const Nationality = [
//     {
//       id: "1",
//       label: "Bangladeshi",
//     },
//     {
//       id: "2",
//       label: "American",
//     },
//     {
//       id: "3",
//       label: "Indian",
//     },
//     {
//       id: "4",
//       label: "Chinese",
//     },
//   ];


//   const phoneRegExp =
//     /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

//   const checkoutSchema = yup.object().shape({
//     name: yup.string().required("required"),
//     fathers_name: yup.string().required("required"),
//     mothers_name: yup.string().required("required"),
//     email: yup.string().email("invalid email").required("required"),
//     contact: yup
//       .string()
//       .matches(phoneRegExp, "Phone number is not valid")
//       .required("required"),
//     address1: yup.string().required("required"),
//     address2: yup.string().required("required"),
//   });
//   const initialValues = {
//     name: "",
//     fathers_name: "",
//     mothers_name: "",
//     email: "",
//     contact: "",
//     address1: "",
//     address2: "",
//     nationality: "",
//   };

//   return (
//     <Box>
//       <Box m={1} display="flex" justifyContent="flex-end" alignItem="flex-end">
//         <p style={{ color: "black" }}>এমপ্লয়ী যুক্ত করুন</p>

//         <IconButton
//           color="success"
//           aria-label="add to shopping cart"
//           onClick={handleOpen}
//         >
//           <AddIcon />
//         </IconButton>
//       </Box>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={{
//             bgcolor: "#0B2447",
//             width: "75%",
//             height: "100%",
//             margin: "auto",
//             boxShadow: 3,
//             borderRadius: 2,
//             display: "block",
//             overflow: "scroll",
//             color: "black",
//           }}
//         >
//           <Header sx={{ color: "success" }} title="কর্মকর্তা/কর্মচারী সংযোজন"/>

//           <Formik
//             onSubmit={(values, { resetForm }) => {
//               // do your stuff
//               console.log(values);
//               resetForm();
//             }}
//             initialValues={initialValues}
//             validationSchema={checkoutSchema}
//           >
//             {({
//               values,
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               handleSubmit,
//               setFieldValue,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <Box
//                   display="grid"
//                   gap="30px"
//                   gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//                   sx={{
//                     gridColumn: "span 4",
//                     color: "black",
//                   }}
//                 >
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="নাম"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.name}
//                     name="name"
//                     error={!!touched.name && !!errors.name}
//                     helperText={touched.name && errors.name}
//                     sx={{ gridColumn: "span 1" }}
//                   />
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="পিতার নাম"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.fathers_name}
//                     name="fathers_name"
//                     error={!!touched.fathers_name && !!errors.fathers_name}
//                     helperText={touched.fathers_name && errors.fathers_name}
//                     sx={{ gridColumn: "span 1" }}
//                   />

//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="মাতার নাম"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.mothers_name}
//                     name="mothers_name"
//                     error={!!touched.mothers_name && !!errors.mothers_name}
//                     helperText={touched.mothers_name && errors.mothers_name}
//                     sx={{ gridColumn: "span 1" }}
//                   />
//                   <TextField
//                     select
//                     label="Natinality"
//                     variant="filled"
//                     value={values.nationality}
//                     onChange={(e) => setFieldValue("nationality", e.target.id)}
//                   >
//                     {Nationality.map((option) => (
//                       <option key={option.label} value={option.label}>
//                         {option.id}
//                       </option>
//                     ))}
//                   </TextField>
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="ইমেইল"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.email}
//                     name="email"
//                     error={!!touched.email && !!errors.email}
//                     helperText={touched.email && errors.email}
//                     sx={{ gridColumn: "span 4" }}
//                   />
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="ফোন"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.contact}
//                     name="contact"
//                     error={!!touched.contact && !!errors.contact}
//                     helperText={touched.contact && errors.contact}
//                     sx={{ gridColumn: "span 4" }}
//                   />
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="স্থায়ী ঠিকানা"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.address1}
//                     name="address1"
//                     error={!!touched.address1 && !!errors.address1}
//                     helperText={touched.address1 && errors.address1}
//                     sx={{ gridColumn: "span 4" }}
//                   />
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="অস্থায়ী ঠিকানা"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.address2}
//                     name="address2"
//                     error={!!touched.address2 && !!errors.address2}
//                     helperText={touched.address2 && errors.address2}
//                     sx={{ gridColumn: "span 4" }}
//                   />
//                 </Box>

//                 <Box display="flex" justifyContent="end">
//                   <Box mt="20px">
//                     <Button type="submit" color="secondary" variant="contained">
//                       সংযোজন
//                     </Button>
//                   </Box>
//                 </Box>
//               </form>
//             )}
//           </Formik>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default ModalAddEmployee;
