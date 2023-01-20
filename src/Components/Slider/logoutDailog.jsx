import React from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Dialog,
  Grid,
  Snackbar,
  experimentalStyled,
} from "@mui/material";
import { auth, firebase } from "../../firebase_config";
import MuiAlert from "@mui/material/Alert";

// import { useSnackbar } from "notistack";
import axios from "axios";

import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const DialogWrapper = experimentalStyled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

const LogoutDailog = ({ setModal }) => {
  // const { enqueSnackbar } = useSnackbar();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const logoutConfirm = async (e) => {
    // e.preventDefault();

    await firebase
      .auth()
      .signOut()
      .then(function () {
        // console.log("Successfully signed out.");
        localStorage.removeItem("accessToken");
        enqueueSnackbar("LogOut Sucessfull", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });

        navigate("/login");
      })
      .catch(function (error) {
        enqueueSnackbar("Failed to LogOut", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        // console.log(error);
        // console.log("An error occurred");
        // });
      });
  };

  return (
    <DialogWrapper open={true} maxWidth="sm" fullWidth keepMounted>
      <Stack alignItems="center" justifyContent="center" p={3}>
        <Typography align="center" variant="h6">
          Do you really want to Logout !!!
        </Typography>

        <Grid container mt={3}>
          <Grid item xs={6} textAlign="center">
            <Button
              variant="contained"
              size="medium"
              onClick={() => setModal((prev) => !prev)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <Button
              variant="outlined"
              sx={{ color: "black" }}
              size="medium"
              onClick={() => logoutConfirm()}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </DialogWrapper>
  );
};

export default LogoutDailog;
