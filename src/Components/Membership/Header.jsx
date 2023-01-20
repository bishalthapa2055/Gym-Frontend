import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MembershipForm from "./MembershipForm";
// import PackagesForm from "./PackagesForm";

const Header = () => {
  const [modalState, setModalState] = React.useState(false);

  const openMembershipForm = () => {
    setModalState(!modalState);
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h6" gutterBottom>
            Memberships Management
          </Typography>
          <Typography variant="subtitle2">
            All Aspects Related To the Memberships Can be Managed From This
            Page!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, sm: 0 } }}
            onClick={openMembershipForm}
            // onclick={alert("hello")}
            variant="contained"
            endIcon={<AddIcon fontSize="small" />}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      {modalState && <MembershipForm setModal={setModalState} />}
    </>
  );
};

export default Header;
