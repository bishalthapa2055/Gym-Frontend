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
  Autocomplete,
  Divider,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { api } from "../../http/api";
import { adminService } from "../../http/admin-services";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useSnackbar } from "notistack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditMembershipForm = ({ id, membership, setModal }) => {
  const data = useSelector((state) => state.packages?.packges);
  console.log(data, "this is packages data");
  const [open, setOpen] = React.useState(false);
  const [startValue, setStartValue] = React.useState();
  const [paymentOption, setPaymentOption] = useState("cash");
  const [startDate, setStartDate] = useState();
  const [packageId, setPackageId] = useState();
  const [endDate, setEndDate] = useState();
  const [endValue, setEndValue] = React.useState();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const [searchedPackage, setSearchedPackage] = useState([]);
  const [name, setName] = useState(membership.userId?.name);
  const [openn, setOpenn] = React.useState(false);
  const [packageName, setPackageName] = useState(membership.package?.name);
  // console.log("mmm", membership.package.name);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  console.log("membership", membership);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const paymentId = membership?.payment?.id;
        // console.log("payment", paymentId);
        // const url = `http://localhost:8888/payment/payments/${paymentId}`;
        // const updatePayment = {
        //   userId: membership?.userId?.id,
        //   packageId: packageId,
        //   paid_via: paymentOption,
        //   amount: price,
        //   processed_by: membership?.userId?.id,
        // };
        const paymentData = {
          userId: membership?.userId?.id,
          packageId: packageId,
          paid_via: paymentOption,
          amount: price,
          processed_by: membership?.userId?.id,
        };
        // const response = await axios.patch(url, updatePayment);
        const response = await adminService.updatePayment(
          dispatch,
          paymentId,
          paymentData
        );
        console.log(response);
        if (response.status === 200) {
          // const membershipUrl = `http://localhost:8888/membership/memberships/${id}`;
          const datas = {
            packageId: packageId,
            paymentId: paymentId,
            start_date: startDate,
            end_date: endDate,
          };
          // const res = await axios
          //   .patch(membershipUrl, datas)
          //   .then((res) => console.log(res))
          //   .catch((err) => console.log(err));

          const res = await adminService.updateMemberships(dispatch, id, datas);
          if (res) {
            // console.log(res);
            enqueueSnackbar("Sucessfully updated Membership", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        }
      } catch (e) {
        enqueueSnackbar("Failed to update Membership", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      setModal((prev) => !prev);
    };
    fetchData();
  };

  const convertStartDate = (e) => {
    // process date
    let date_string = e;
    console.log(e);
    let date_obj = moment(date_string, "ddd MMM DD YYYY HH:mm:ss ZZ (zzz)");
    console.log(
      "🚀 ~ file: EditMembershipForm.jsx:142 ~ convertStartDate ~ date_obj",
      date_obj
    );
    let unix_timestamp = date_obj.unix();

    setStartValue(e);
    setStartDate(unix_timestamp);
  };
  const changeEndDate = (e) => {
    let date_string = e;
    let date_obj = moment(date_string, "ddd MMM DD YYYY HH:mm:ss ZZ (zzz)");
    let unix_timestamp = date_obj.unix();
    console.log("end  date", e);
    // setEndValue(date_obj);
    setEndValue(e);
    setEndDate(unix_timestamp);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={true}>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom flexWrap="wrap">
          {/* {edit ? "Update Student" : "Add New Student"} */}
          Update Membership
        </Typography>
        <Typography variant="subtitle2" flexWrap="wrap">
          Fill the below form to Update a Memberships.
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 2 }}>
          <Grid container spacing={2} flexWrap="wrap">
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus={true}
                    size="small"
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    readOnly
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <DesktopDatePicker
                    label="Start Date"
                    value={startValue}
                    // onChange={(e, newValue) => {
                    //   console.log("new", newValue);
                    //   console.log(e);
                    //   setValue(e);
                    // }}
                    onChange={convertStartDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DesktopDatePicker
                    label="End Date"
                    value={endValue}
                    onChange={changeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Autocomplete
                    disableClearable={true}
                    size="small"
                    disablePortal
                    options={searchedPackage}
                    id="combo-box-demo"
                    // defaultValue={membership.package.name}
                    getOptionLabel={(option) => option?.name}
                    onChange={(e, data) => {
                      console.log("id package", data.id);
                      console.log("price", data.price);
                      setPrice(data.price);
                      setPackageId(data.id);
                    }}
                    noOptionsText={
                      loading ? <CircularProgress /> : "No Package found"
                    }
                    renderOption={(props, packagess) => (
                      <Box
                        component="li"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                        // sx={{ '& > img': { flexShrink: 0 } }}
                        {...props}
                        key={packagess.id}
                      >
                        <Typography>{packagess.name}</Typography>
                        <Divider />

                        <Box>
                          <Typography variant="subtitle2">
                            {packagess.duration_in_days
                              ? `Duration : .${packagess.duration_in_days}`
                              : "No Additonal information"}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // required
                        variant="outlined"
                        label="Search via Package Name"
                        // onChange={(e) => handleQueryChange(e.target.value)}

                        onChange={async (e) => {
                          if (e.target.value) {
                            setLoading(true);

                            const url = `http://localhost:8888/package/published?searchTerm=${e.target.value}`;
                            const response = await axios.get(url);

                            console.log(response.data?.data);
                            setLoading(false);
                            setSearchedPackage(response.data?.data);
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    fullWidth
                    // label="price"
                    id="price"
                    variant="outlined"
                    value={price}
                  />
                </Grid>
                <FormControl sx={{ m: 2, minWidth: 200 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Payment
                  </InputLabel>
                  <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={paymentOption}
                    label="Payment"
                    onChange={(e) =>
                      setPaymentOption(e.target.value) &&
                      console.log(e.target.value)
                    }
                    default="cash"
                  >
                    <MenuItem value="cash">CASH</MenuItem>
                    <MenuItem value="esewa">E-SEWA</MenuItem>
                    <MenuItem value="khalti">KHALTI</MenuItem>
                  </Select>
                </FormControl>
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
              {/* <b>{packages.name} is Sucessfully Updated!!!</b> */}
            </Alert>
          </Snackbar>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditMembershipForm;
