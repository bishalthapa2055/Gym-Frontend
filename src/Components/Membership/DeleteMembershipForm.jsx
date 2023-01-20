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
import MuiAlert from "@mui/material/Alert";

// import { useSnackbar } from "notistack";
import axios from "axios";
import { api } from "../../http/api";
import { adminService } from "../../http/admin-services";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
const DialogWrapper = experimentalStyled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DeleteMembershipForm = ({ id, membership, setModal }) => {
  // const { enqueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [openn, setOpenn] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteConfirm = (e) => {
    try {
      const res = adminService.deleteMemberships(dispatch, id);
      if (res) {
        // console.log(res);
        // setOpen(true);
        enqueueSnackbar("Sucessfully Deleted Membership", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setModal((prev) => !prev);
        // setOpenn(true);
      }
    } catch (e) {
      enqueueSnackbar("Failed to Delete Membership", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <DialogWrapper open={true} maxWidth="sm" fullWidth keepMounted>
      <Stack alignItems="center" justifyContent="center" p={3}>
        <Typography align="center" variant="h6">
          Do you want to Delete Memebership of <b>{membership?.userId?.name}</b>{" "}
          of :<b> {membership?.package?.name} </b>
          permanently ?
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
              onClick={() => deleteConfirm()}
            >
              Confirm
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
                <b>
                  {membership?.userId?.name} Membership is Deleted Sucessfully
                  !!!
                </b>
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Stack>
    </DialogWrapper>
  );
};

export default DeleteMembershipForm;
