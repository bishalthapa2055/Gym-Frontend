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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditUserForm = ({ edit, id, setModal, user }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phonenumber, setPhonenumber] = useState(user.phone);
  const [emergency_number, setEmergency_number] = useState(
    user.emergency_number
  );

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

  //   const handleBlur = (e) => {
  //     setName(e.target.value);
  //   };
  // for snackbar
  //   const [open, setOpen] = React.useState(false);
  //   const handleqqqClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  // const deleteConfirm = () => {
  //   setOpen(true);
  // };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    setOpen(true);
    e.preventDefault();
    window.location.reload();
    // e.stopImmediatePropagation();
    console.log("click");
    const url = `http://localhost:8888/users/update/${id}`;
    axios
      .patch(url, {
        name: name,
        phone: phonenumber,
        email: email,
        emergency_number: emergency_number,
      })
      .then(function (response) {
        console.log(response);
        // useNavigate()
        // alert("Form Updated Sucessfully");
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
                    placeholder={user.name}
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
                    label="Email"
                    name="email"
                    // onBlur={handleBlur}
                    onChange={handlemail}
                    placeholder={email}
                    value={email}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    //   error={Boolean(touched.password && errors.password)}
                    fullWidth
                    //   helperText={touched.password && errors.password}
                    label="Phone Number"
                    name="phonenumber"
                    //   onBlur={handleBlur}
                    onChange={handlephone}
                    value={phonenumber}
                    placeholder={user.phone}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Emergency Number"
                    name="emergency_number"
                    onChange={handleemergency}
                    value={emergency_number}
                    placeholder={user.emergency_number}
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
              <b>{user.name} is Sucessfully Updated!!!</b>
            </Alert>
          </Snackbar>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserForm;
