// import { adminService } from "../../../../http/admin-service";
import { experimentalStyled } from "@mui/material";
import { Box, Button, Typography, Dialog, Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSnackbar } from "notistack";
import { adminService } from "../../http/admin-services";
import { useDispatch } from "react-redux";
// import { useAppDispatch } from "@/src/hooks/hooks";

const DialogWrapper = experimentalStyled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

const UpdateStatus = ({ id, status, closeFunction, model }) => {
  // const [updateStatusModel, setUpdateStatusModel] = React.useState(true);
  //   console.log(id, status);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const updateFunction = async () => {
    const data = {
      status: status,
    };
    // console.log(data);
    console.log("id", id);

    // const response = await adminService.updateStatus(dispatch, id, data);

    // response

    // const responses = await adminService.updateStatus(dispatch, id, status);
    // console.log(
    //   "🚀 ~ file: updateStatus.jsx:36 ~ updateFunction ~ responses",
    //   responses
    // );

    // if (responses) {
    //   try {
    //     enqueueSnackbar("Sucessfully updated Status", {
    //       variant: "success",
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "right",
    //       },
    //     });
    //     closeFunction((model) => !model);
    //   } catch (e) {
    //     enqueueSnackbar("Failed to update Status", {
    //       variant: "error",
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "right",
    //       },
    //     });
    //   }
    // }

    const fetchData = async () => {
      const values = {
        status: status,
      };
      const res = await adminService.updateStatus(dispatch, id, values);
      console.log(
        "🚀 ~ file: updateStatus.jsx:66 ~ fetchData ~ values",
        values
      );
      console.log("🚀 ~ file: updateStatus.jsx:66 ~ fetchData ~ id", id);

      if (res) {
        try {
          enqueueSnackbar("Sucessfully updated Status", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });

          closeFunction(!model);
        } catch (e) {
          enqueueSnackbar("Failed to update Status", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      }
    };
    if (id) fetchData();

    // const url = `http://localhost:8888/package/packages/${id}`;
    // await axios
    //   .patch(url, {
    //     status: status,
    //   })
    //   .then((res) => {
    //     console.log("🚀 ~ file: updateStatus.jsx:39 ~ .then ~ res", res);

    //     enqueueSnackbar("Sucessfully updated Status", {
    //       variant: "success",
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "right",
    //       },
    //     });
    //     closeFunction((prev) => !prev);
    //   })
    //   .catch((err) => {
    //     console.log(
    //       "🚀 ~ file: updateStatus.jsx:49 ~ updateFunction ~ err",
    //       err
    //     );
    //     enqueueSnackbar("Failed to update Status", {
    //       variant: "error",
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "right",
    //       },
    //     });
    //   });
  };

  return (
    <DialogWrapper
      open={true}
      maxWidth="sm"
      fullWidth
      // TransitionComponent={Transition}
      keepMounted
      // onClose={closeConfirmDelete}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={5}
      >
        <Typography align="center" variant="h6">
          Are you sure you want to update the Packages status ?
        </Typography>

        <Grid container spacing={3} my={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => closeFunction()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} align="end">
            <Button
              variant="outlined"
              sx={{ color: "black" }}
              size="medium"
              onClick={() => updateFunction()}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default UpdateStatus;
