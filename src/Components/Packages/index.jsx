import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PackagesForm from "./PackagesForm";

const Header = () => {
  const [modalState, setModalState] = React.useState(false);

  const openPackagesForm = () => {
    setModalState(!modalState);
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h6" gutterBottom>
            Lists of Packages
          </Typography>
          <Typography variant="subtitle2">
            All Aspects Related To the Packages Can be Managed From This Page!
          </Typography>
          {/* </Grid> */}
          <Grid item>
            <Button
              sx={{ mb: { xs: 4, sm: 2 } }}
              onClick={openPackagesForm}
              //   onclick={alert("hello")}
              variant="contained"
              endIcon={<AddIcon fontSize="small" />}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {modalState && <PackagesForm setModal={setModalState} />}
    </>
  );
};

export default Header;
