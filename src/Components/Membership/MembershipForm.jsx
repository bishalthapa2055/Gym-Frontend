import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogTitle,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  Select,
  Snackbar,
  CircularProgress,
  Box,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import { packagesSchema } from "../Schemas/packages";
import { adminService } from "../../http/admin-services";
import { useDispatch } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import { Search } from "@mui/icons-material";
import moment from "moment/moment";
import { DatePicker } from "@material-ui/pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useSnackbar } from "notistack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MembershipForm = ({ setModal }) => {
  const [open, setOpen] = React.useState(false);

  const [startDate, setStartDate] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [rowdata, setRowdata] = useState([]);

  const [options, setOptions] = useState([]);
  const previousController = React.useRef();
  const [selectedId, setSelectedId] = useState();
  const [searchedUser, setSearchedUser] = useState([]);
  const [fieldValue, setFieldValue] = useState();
  const [searchedPackage, setSearchedPackage] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startValue, setStartValue] = React.useState();
  const [durations, setDurations] = useState(0);

  const [endValue, setEndValue] = React.useState();
  const [price, setPrice] = useState();
  const [endDate, setEndDate] = useState();
  const [paymentOption, setPaymentOption] = useState("cash");
  const [userId, setUserId] = useState();
  const [packageId, setPackageId] = useState();
  const [openn, setOpenn] = useState(false);

  const [endDateTimestamp, setendDateTimestamp] = useState();
  const [endFullDate, setEndFullDate] = useState();

  const dispatch = useDispatch();
  console.log("duration", durations);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleeClose = () => {
    setOpenn(false);
  };

  const handleeOpen = () => {
    setOpenn(true);
  };
  // console.log("date", startDate);
  // console.log("idd", fieldValue);
  // console.log("duration", durations);

  const convertStartDate = async (e) => {
    // process date
    let date_string = e;
    let date_obj = moment(date_string, "ddd MMM DD YYYY HH:mm:ss ZZ (zzz)");
    let unix_timestamp = date_obj.unix();
    // console.log(
    //   "🚀 ~ file: MembershipForm.jsx:92 ~ convertStartDate ~ unix_timestamp for start date",
    //   unix_timestamp
    // );
    // // console.log(unix_timestamp);
    // let date_obj = moment(date_string, "MM DD YYYY");
    // let date = moment(date_string).format("MM-DD-YYYY");
    // console.log("start date", e);
    // console.log("..", date);
    // setStartValue(date_obj);
    setStartValue(e);
    setStartDate(unix_timestamp);

    // for converting and fixing the date according to the package duration

    let timestamp = unix_timestamp;
    let date = new Date(timestamp * 1000);
    console.log(
      "🚀 ~ file: MembershipForm.jsx:111 ~ convertStartDate ~ date",
      date
    );

    let options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    // const end_timestamp = date.toLocaleString("en-US", options);
    // console.log(
    //   "🚀 ~ file: MembershipForm.jsx:122 ~ convertStartDate ~ end_timestamp",
    //   end_timestamp
    // );

    const updatedDate = await date.toLocaleString("en-US", options);
    // console.log(
    //   "🚀 ~ file: MembershipForm.jsx:130 ~ convertStartDate ~ updatedDate",
    //   updatedDate
    // );
    let enddate = new Date(updatedDate);
    console.log(
      "🚀 ~ file: MembershipForm.jsx:138 ~ convertStartDate ~ enddate",
      enddate
    );
    let newDate = await new Date(
      enddate.getTime() + durations * 24 * 60 * 60 * 1000
    );
    console.log(
      "🚀 ~ file: MembershipForm.jsx:132 ~ convertStartDate ~ newDate",
      newDate
    );
    const timestampEnd = Math.floor(newDate.getTime() / 1000);
    console.log(
      "🚀 ~ file: MembershipForm.jsx:133 ~ convertStartDate ~ timestampEnd",
      timestampEnd
    );
    setEndFullDate(newDate);
    setendDateTimestamp(timestampEnd);
  };
  // console.log("hh", endFullDate);
  // console.log(",,", endDateTimestamp);
  const changeEndDate = (e) => {
    // let date_string = e;
    // // console.log("end-data", e);
    // let date_obj = moment(date_string, "MM DD YYYY");
    // // let unix_timestamp = date_obj.unix();
    // let date = moment(date_string).format("MM-DD-YYYY");

    let date_string = e;
    let date_obj = moment(date_string, "ddd MMM DD YYYY HH:mm:ss ZZ (zzz)");
    let unix_timestamp = date_obj.unix();
    // console.log("end  date", e);
    // setEndValue(date_obj);
    setEndValue(e);
    setEndDate(unix_timestamp);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    //first create payment then only use of payment id in the membership portion
    e.preventDefault();
    // const url = "http://localhost:8888/payment/payments";
    // const res = await axios.post(url, {
    //   userId: userId,
    //   amount: price,
    //   package: packageId,
    //   processed_by: userId,
    //   paid_via: paymentOption,
    // });
    const values = {
      userId: userId,
      amount: price,
      package: packageId,
      processed_by: userId,
      paid_via: paymentOption,
    };

    const res = await adminService.createPayment(dispatch, values);

    // const paymentData = {
    //   userId: userId,
    //   amount: price,
    //   package: packageId,
    //   processed_by: userId,
    //   paid_via: paymentOption,
    // };

    try {
      if (res.status === 200) {
        const payId = res?.data.data.id;
        const values = {
          userId: userId,
          start_date: startDate,
          end_date: endDateTimestamp,
          package: packageId,
          payment: payId,
        };
        const response = await adminService.createMemberships(dispatch, values);

        if (response) {
          enqueueSnackbar("Sucessfully Created Membership", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setModal((prev) => !prev);
        }
      }
    } catch (e) {
      enqueueSnackbar("Failed to Create Membership", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  return (
    <Dialog fullWidth maxWidth="md" open={true}>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom flexWrap="wrap">
          {/* {edit ? "Update Student" : "Add New Student"} */}
          Add New Membership
        </Typography>
        <Typography variant="subtitle2" flexWrap="wrap">
          Fill the below form to create a Membership to the site.
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 2 }}>
          <Grid container spacing={2} flexWrap="wrap">
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    disableClearable={true}
                    size="small"
                    disablePortal
                    options={searchedUser}
                    id="combo-box-demo"
                    getOptionLabel={(option) => option?.name}
                    onChange={(e, data) => {
                      // console.log("id data", data.id);
                      setUserId(data.id);
                    }}
                    noOptionsText={
                      loading ? <CircularProgress /> : "No student found"
                    }
                    renderOption={(props, user) => (
                      <Box
                        component="li"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                        // sx={{ '& > img': { flexShrink: 0 } }}
                        {...props}
                        key={user.id}
                      >
                        <Typography>{user.name}</Typography>
                        <Divider />

                        <Box>
                          <Typography variant="subtitle2">
                            {user.email
                              ? `Email : .${user.email}`
                              : user.phone
                              ? `Ph. ${user.phone}`
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
                        label="Search via username"
                        // onChange={(e) => handleQueryChange(e.target.value)}

                        onChange={async (e) => {
                          if (e.target.value) {
                            setLoading(true);

                            const url = `http://localhost:8888/users/search?searchTerm=${e.target.value}`;
                            const response = await axios.get(url);

                            // console.log(response.data?.data);
                            setLoading(false);
                            setSearchedUser(response.data?.data);
                          }
                        }}
                      />
                    )}
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
                    // value={endValue}
                    value={endFullDate}
                    // onChange={changeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                    readOnly
                  >
                    {/* {endFullDate} */}
                  </DesktopDatePicker>
                </Grid>
                <Grid item xs={9}>
                  <Autocomplete
                    disableClearable={true}
                    size="small"
                    disablePortal
                    options={searchedPackage}
                    id="combo-box-demo"
                    getOptionLabel={(option) => option?.name}
                    onChange={(e, data) => {
                      // console.log("id package", data.id);
                      // console.log("price", data.price);
                      setPrice(data.price);
                      setPackageId(data.id);
                      setDurations(data.duration_in_days);
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

                            // console.log(response.data?.data);
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
                  >
                    {/* {price} */}
                  </TextField>
                </Grid>
                {/*  */}
                {/* <Grid item xs={6}>
                  <select
                    label="payment option"
                    default="esewa"
                    value={paymentOption}
                    onChange={(e) => {
                      setPaymentOption(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option value="cash">CASH</option>
                    <option value="esewa">E-SEWA</option>
                    <option value="khalti">KHALTI</option>
                  </select>
                </Grid> */}
                <FormControl sx={{ m: 2, minWidth: 200 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Payment
                  </InputLabel>
                  <Select
                    open={openn}
                    onClose={handleeClose}
                    onOpen={handleeOpen}
                    value={paymentOption}
                    label="Payment"
                    onChange={
                      (e) => setPaymentOption(e.target.value)
                      //  &&
                      // console.log(e.target.value)
                    }
                    default="cash"
                  >
                    <MenuItem value="cash">CASH</MenuItem>
                    <MenuItem value="esewa">E-SEWA</MenuItem>
                    <MenuItem value="khalti">KHALTI</MenuItem>
                  </Select>
                </FormControl>

                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button color="secondary" onClick={() => setModal((prev) => !prev)}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Submit
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
              <b>Membership is Sucessfully Created !!!</b>
            </Alert>
          </Snackbar>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MembershipForm;
