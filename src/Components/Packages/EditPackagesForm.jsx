import React, { useState } from "react";

import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { api } from "../../http/api";
import { adminService } from "../../http/admin-services";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditPackagesForm = ({ edit, id, setModal, packages }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(packages.name);
  const [discountedPercentage, setDiscountedPercentage] = useState(
    packages.discount_percentage
  );
  const [durationinDays, setDurationinDays] = useState(
    packages.duration_in_days
  );
  const [price, setPrice] = useState(packages.price);
  const dispatch = useDispatch();

  const handlename = (e) => {
    setName(e.target.value);
  };
  const handlediscountpercentage = (e) => {
    setDiscountedPercentage(e.target.value);
  };
  const handledurationindays = (e) => {
    setDurationinDays(e.target.value);
  };
  const handleprice = (e) => {
    setPrice(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // window.location.reload();
    // e.stopImmediatePropagation();
    console.log("click");

    /*
    setOpen(true);
    const url = `http://localhost:8888/package/packages/${id}`;
    // const url = `/update/${id}`;
    const res = api
      .patch(url, {
        name: name,
        discount_percentage: discountedPercentage,
        duration_in_days: durationinDays,
        price: price,
      })
      .then(function (response) {
        console.log(response);
        // useNavigate()
        // alert("Form Updated Sucessfully");
      })
      .catch(function (error) {
        console.log(error);
      });

      */

    const fetchData = async () => {
      const values = {
        name: name,
        discount_percentage: discountedPercentage,
        duration_in_days: durationinDays,
        price: price,
      };
      const res = adminService.updatePackage(dispatch, id, values);
      console.log("🚀 ~ file: EditPackagesForm.jsx:92 ~ fetchData ~ res", res);

      if (res) {
        setOpen(true);
        setModal((prev) => !prev);
      }
    };
    fetchData();
    // const fetchdata = async () => {
    //   const url = `/users/${id}`;
    //   const res = await api.patch(url, {
    //     name: name,
    //     discount_percentage: discountedPercentage,
    //     duration_in_days: durationinDays,
    //     price: price,
    //   });
    //   if (res) {
    //     setOpen(true);
    //     // setPackages(res.data);
    //     // setLoading(false);
    //   }
    // };

    // fetchdata();

    // axios
    //   .patch(url, {
    //     name: name,
    //     phone: phonenumber,
    //     email: email,
    //     emergency_number: emergency_number,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     // useNavigate()
    //     // alert("Form Updated Sucessfully");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <Dialog fullWidth maxWidth="md" open={true}>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom flexWrap="wrap">
          {/* {edit ? "Update Student" : "Add New Student"} */}
          Add New User
        </Typography>
        <Typography variant="subtitle2" flexWrap="wrap">
          Fill the below form to create or update a User to the site.
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
                    // error={Boolean(touched.name && errors.name)}
                    fullWidth
                    // helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    placeholder={packages.name}
                    // onBlur={handleBlur}
                    onChange={handlename}
                    // onBlur={handleBlur}
                    value={name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    // error={Boolean(touched.email && errors.email)}
                    fullWidth
                    // helperText={touched.email && errors.email}
                    label="Discount percentage"
                    name="discount_percentage"
                    // onBlur={handleBlur}
                    onChange={handlediscountpercentage}
                    placeholder={packages.discountedPercentage}
                    value={discountedPercentage}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    //   error={Boolean(touched.password && errors.password)}
                    fullWidth
                    //   helperText={touched.password && errors.password}
                    label="Duration in days"
                    name="durationinDays"
                    //   onBlur={handleBlur}
                    onChange={handledurationindays}
                    value={durationinDays}
                    placeholder={packages.durationinDays}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="price"
                    name="price"
                    onChange={handleprice}
                    value={price}
                    placeholder={packages.price}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button color="secondary" onClick={() => setModal((prev) => !prev)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Edit
          </Button>
        </DialogActions>
        <Snackbar
          open={open}
          autoHideDuration={3000}
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
            <b>{packages.name} is Sucessfully Updated!!!</b>
          </Alert>
        </Snackbar>
      </form>
    </Dialog>
  );
};

export default EditPackagesForm;
