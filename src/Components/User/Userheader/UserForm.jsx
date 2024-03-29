import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { form } from "../../Schemas";
import { useDispatch } from "react-redux";
import { adminService } from "../../../http/admin-services";
import { useSnackbar } from "notistack";

const initialValues = {
  name: "",
  email: "",
  phonenumber: "",
  emergency_number: "",
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserForm = ({ setModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emergency_number, setEmergency_number] = useState("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: form,
      onSubmit: async (values, action) => {
        // const url = "http://localhost:8888/users/create";
        // const res = axios
        //   .post(
        //     url,

        //     {
        //       name: values.name,
        //       phone: values.phonenumber,
        //       email: values.email,
        //       emergency_number: values.emergency_number,
        //       // image: formData,
        //     }
        //   )
        //   .then(function (response) {
        //     console.log(response);
        //     // alert("Form submitted sucessfully");
        //     action.resetForm();
        //     // navigate("/users");
        //     window.location.reload();
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
        //   .finally(() => setOpen(true));
        try {
          const data = {
            name: values.name,
            phone: values.phonenumber,
            email: values.email,
            emergency_number: values.emergency_number,
          };
          const res = await adminService.createUsers(dispatch, data);
          console.log("🚀 ~ file: UserForm.jsx:79 ~ onSubmit: ~ res", res);
          if (res) {
            setModal((prev) => !prev);
            enqueueSnackbar("Sucessfully Created User", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        } catch (e) {
          enqueueSnackbar("Failed to Create User", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        // console.log("🚀 ~ file: UserForm.jsx:22 ~ UserForm ~ values", values);
      },
    });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(true);
  };

  const handlename = (e) => {
    setName(e.target.value);
  };
  const handlemail = (e) => {
    setEmail(e.target.value);
  };
  const handlephone = (e) => {
    setPhonenumber(e.target.value);
  };
  const handleemergency = (e) => {
    setEmergency_number(e.target.value);
  };

  const handleSend = (e) => {
    //handlesubmit work to be done
    e.preventDefault();
    window.location.reload();

    const url = "http://localhost:8888/users/create";
    axios
      .post(
        url,

        {
          name: name,
          phone: phonenumber,
          email: email,
          emergency_number: emergency_number,
          // image: formData,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Form submitted sucessfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Dialog fullWidth maxWidth="md" open={true}>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom flexWrap="wrap">
          {/* {edit ? "Update Student" : "Add New Student"} */}
          Add New User
        </Typography>
        <Typography variant="subtitle2" flexWrap="wrap">
          Fill the below form to create a User to the site.
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 2 }}>
          <Grid container spacing={2} flexWrap="wrap">
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus={true}
                    size="small"
                    error={
                      Boolean(touched.name && errors.name) ? errors.name : null
                    }
                    // {touched.name && errors.name ? errors.name : null}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    id="name"
                    onBlur={handleBlur}
                    // onChange={handlename}
                    onChange={handleChange}
                    value={values.name}
                    // onSubmit={handleSubmit}
                    variant="outlined"
                    // error={errors.name}
                  />
                  {/* {errors.name && touched.name ? <p>{errors.name}</p> : null} */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    name="email"
                    id="email"
                    onBlur={handleBlur}
                    // onChange={handlemail}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                {/*  */}
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    error={Boolean(touched.phonenumber && errors.phonenumber)}
                    fullWidth
                    helperText={touched.phonenumber && errors.phonenumber}
                    label="Phone Number"
                    name="phonenumber"
                    id="phonenumber"
                    onBlur={handleBlur}
                    // onChange={handlephone}
                    onChange={handleChange}
                    value={values.phonenumber}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    error={Boolean(
                      touched.emergency_number && errors.emergency_number
                    )}
                    fullWidth
                    helperText={
                      touched.emergency_number && errors.emergency_number
                    }
                    label="Emergency Number"
                    name="emergency_number"
                    id="emergency_number"
                    onBlur={handleBlur}
                    // onChange={handleemergency}
                    onChange={handleChange}
                    value={values.emergency_number}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <TextField
                    size="small"
                    // error={Boolean(
                    //   touched.secondary_number && errors.secondary_number
                    // )}
                    fullWidth
                    // helperText={
                    //   touched.secondary_number && errors.secondary_number
                    // }
                    // label="Image"
                    name="image"
                    // onBlur={handleBlur}
                    onChange={handleimage}
                    // value={values.secondary_number}
                    variant="outlined"
                    type="file"
                  /> */}
                  {/* <input type="file" id="image" alt="Image" /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button color="secondary" onClick={() => setModal((prev) => !prev)}>
            Cancel
          </Button>
          {/* <input type="submit" name="submit" value="Cancel" formnovalidate /> */}
          <Button
            type="submit"
            // startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            // disabled={Boolean(errors.submit) || isSubmitting}
            variant="contained"
            // onClick={handleSend}
          >
            {/* {edit ? "Update Student" : "Add new student"} */}
            Submit
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onclose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
              vertical="top"
              horizontal="right"
            >
              <b>User is Sucessfully Created !!!</b>
              {/* {open ? {navigate("/users")} :null } */}
              {/* {navigate("/users")} */}
            </Alert>
          </Snackbar>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;
