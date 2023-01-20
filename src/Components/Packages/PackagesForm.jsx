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

import { packagesSchema } from "../Schemas/packages";
import { adminService } from "../../http/admin-services";
import { useDispatch } from "react-redux";

const initialValues = {
  name: "",
  discount_percentage: "",
  duration_in_days: "",
  price: "",
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PackagesForm = ({ setModal }) => {
  //   const [name, setName] = useState("");
  //   const [discount_percentage, setdiscount_percentage] = useState("");
  //   const [duration_in_days, setduration_in_days] = useState("");
  //   const [price, setprice] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  //   const navigate = useNavigate();
  const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: packagesSchema,
      onSubmit: (values, action) => {
        // const res = axios
        //   .post(
        //     url,

        //     {
        //       name: values.name,
        //       //   phone: values.phonenumber,
        //       //   email: values.email,
        //       //   emergency_number: values.emergency_number,
        //       // image: formData,
        //       discount_percentage: values.discount_percentage,
        //       duration_in_days: values.duration_in_days,
        //       price: values.price,
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
        // console.log("🚀 ~ file: UserForm.jsx:22 ~ UserForm ~ values", values);
        const data = {
          name: values.name,
          discount_percentage: values.discount_percentage,
          duration_in_days: values.duration_in_days,
          price: values.price,
        };

        const createPackages = adminService.createPackage(dispatch, data);
        if (createPackages) {
          action.resetForm();
          setOpen(true);
          setModal((prev) => !prev);
        }
      },
    });
  console.log("🚀 ~ file: UserForm.jsx:30 ~ UserForm ~ errors", errors);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(true);
  };

  //   const handlename = (e) => {
  //     setName(e.target.value);
  //   };
  //   const handlemail = (e) => {
  //     setEmail(e.target.value);
  //   };
  //   const handlephone = (e) => {
  //     setPhonenumber(e.target.value);
  //   };
  //   const handleemergency = (e) => {
  //     setEmergency_number(e.target.value);
  //   };

  //   const handleSend = (e) => {
  //     //handlesubmit work to be done
  //     e.preventDefault();
  //     window.location.reload();

  //     const url = "http://localhost:8888/users/create";
  //     axios
  //       .post(
  //         url,

  //         {
  //           //   name: name,
  //           //   phone: phonenumber,
  //           //   email: email,
  //           //   emergency_number: emergency_number,
  //           name: name,
  //           discount_percentage: discount_percentage,
  //           duration_in_days: duration_in_days,
  //           price: price,
  //           // image: formData,
  //         }
  //       )
  //       .then(function (response) {
  //         console.log(response);
  //         alert("Form submitted sucessfully");
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };

  return (
    <Dialog fullWidth maxWidth="md" open={true}>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom flexWrap="wrap">
          {/* {edit ? "Update Student" : "Add New Student"} */}
          Add New Package
        </Typography>
        <Typography variant="subtitle2" flexWrap="wrap">
          Fill the below form to create a Package to the site.
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
                    error={Boolean(
                      touched.discount_percentage && errors.discount_percentage
                    )}
                    fullWidth
                    helperText={
                      touched.discount_percentage && errors.discount_percentage
                    }
                    label="discount_percentage"
                    name="discount_percentage"
                    id="discount_percentage"
                    onBlur={handleBlur}
                    // onChange={handlemail}
                    onChange={handleChange}
                    value={values.discount_percentage}
                    variant="outlined"
                  />
                </Grid>
                {/*  */}
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    error={Boolean(
                      touched.duration_in_days && errors.duration_in_days
                    )}
                    fullWidth
                    helperText={
                      touched.duration_in_days && errors.duration_in_days
                    }
                    label="duration_in_days"
                    name="duration_in_days"
                    id="duration_in_days"
                    onBlur={handleBlur}
                    // onChange={handlephone}
                    onChange={handleChange}
                    value={values.duration_in_days}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    error={Boolean(touched.price && errors.price)}
                    fullWidth
                    helperText={touched.price && errors.price}
                    label="price"
                    name="price"
                    id="price"
                    onBlur={handleBlur}
                    // onChange={handleemergency}
                    onChange={handleChange}
                    value={values.price}
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
              <b>Packages is Sucessfully Created !!!</b>
              {/* {open ? {navigate("/users")} :null } */}
              {/* {navigate("/users")} */}
            </Alert>
          </Snackbar>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PackagesForm;
