import React from "react";
import formik from "formik";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const UserForm = () => {
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
      {/* <Formik  initialValues={{
          name: edit && student ? student.name : '',
          email: edit && student ? student.email : '',
          coverImage: '',
          description: edit && student ? student.description : '',
          address: '',
          primary_number: edit && student ? student.primary_number : '',
          secondary_number: edit && student ? student.secondary_number : '',

          password: '',

          submit: null,
        }} */}
    </Dialog>
  );
};

export default UserForm;
