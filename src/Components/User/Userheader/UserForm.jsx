import React, { useState, useEffect } from "react";
// import formik from "formik";
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
} from "@mui/material";

const UserForm = ({ setModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emergency_number, setEmergency_number] = useState("");

  const [image, setImage] = useState();

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
  const handleimage = (e) => {
    //   const data = new FormData();
    // data.append('file',e.target.files[0]);
    // setImage(image :[...e.target.file]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    //handlesubmit work to be done
    e.preventDefault();
    window.location.reload();

    const url = "http://localhost:8888/users/create";
    axios
      .post(
        url,
        // {
        //   name: name,
        //   phone: phonenumber,
        //   email: email,
        //   emergency_number: emergency_number,
        //   image: formData,
        // },
        // config
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
  // console.log(image);

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

      <form>
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
                    // onBlur={handleBlur}
                    onChange={handlename}
                    // value={values.name}
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
                    // value={values.email}
                    variant="outlined"
                  />
                </Grid>
                {/*  */}
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
                    //   value={values.password}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    // error={Boolean(
                    //   touched.primary_number && errors.primary_number
                    // )}
                    fullWidth
                    // helperText={touched.primary_number && errors.primary_number}
                    label="Emergency Number"
                    name="emergency_number"
                    // onBlur={handleBlur}
                    onChange={handleemergency}
                    // value={values.primary_number}
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
            onClick={handleSubmit}
          >
            {/* {edit ? "Update Student" : "Add new student"} */}
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;
