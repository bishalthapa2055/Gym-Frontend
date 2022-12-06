import React, { useState } from "react";
// import { Button, Grid, Typography } from "@material-ui";
import { Button, Typography, Grid } from "@mui/material";
import UserForm from "./UserForm";
import AddIcon from "@mui/icons-material/Add";

function Header() {
  const [modalState, setModalState] = useState(false);

  const openUserForm = () => {
    setModalState(!modalState);
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h6" gutterBottom>
            Users Management
          </Typography>
          <Typography variant="subtitle2">
            All Aspects Related To the Users Can be Managed From This Page!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, sm: 0 } }}
            onClick={openUserForm}
            variant="contained"
            endIcon={<AddIcon fontSize="small" />}
          >
            Create User
          </Button>
        </Grid>
      </Grid>
      {modalState && <UserForm setModal={setModalState} />}
    </>
  );
}

export default Header;
