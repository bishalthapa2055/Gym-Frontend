import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
// import Sidebar from "@/src/page-components/sidebar";
// import SchoolIcon from "@mui/icons-material/School";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import { adminService } from "@/src/http/admin-service";
// import { useAppDispatch, useAppSelector } from "@/src/hooks/hooks";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { People } from "@mui/icons-material";
import Login from "../login";
import { api } from "../http/api";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import Progress from "./Progress";
import { useStore } from "react-redux";

function DashboardContent() {
  const [countUser, setCountUser] = useState();
  const [countMembership, setCountMembership] = useState();
  const [countActiveMembership, setCountActiveMembership] = useState();
  const [countPrice, setCountPrice] = useState();
  const [countPackage, setCountPackage] = useState();
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const dispatch = useAppDispatch()
  //   const dashboardStats = useAppSelector((state) => state.dashboard);

  //   useEffect(() => {
  //     adminService.getStats(dispatch);
  //   }, [dispatch]);
  // var token = localStorage.getItem("accessToken");
  // if (token) {
  //   setDisplay(true);
  // }
  useEffect(() => {
    api.get("/users/count").then(function (response) {
      // console.log(response.data.count);
      setCountUser(response?.count);
      // console.log(response.data.data.count);
    });
    api.get("/membership/count").then(function (response) {
      // console.log(response.data.count);
      setCountMembership(response?.count);

      // console.log(response);
    });
    api.get("/memberships/checkdates").then(function (response) {
      // console.log(response.data.count);
      setCountActiveMembership(response?.count);

      // console.log(response);
    });
    api.get("/memberships/findsum").then(function (response) {
      // console.log(response.data.count);
      setCountPrice(response?.data);
      // setCountPrice(response);

      // console.log(response);
    });
    // api.get("/memberships/findsum").then(function (response) {
    //   // console.log(response.data.count);
    //   setCountPrice(response?.data);

    //   // console.log(response);
    // });
    api.get("/packages/count").then(function (response) {
      // console.log(response.data.count);
      setCountPackage(response?.count);
      console.log(response);
      // console.log(response);
    });

    setIsLoading(true);
  }, []);
  // console.log("user", countUser);
  // console.log("mem", countMembership);
  // useEffect(() => {
  //   axios
  //     .get("https://gymmvp.herokuapp.com/api/web/membership/count")
  //     .then(function (response) {
  //       // console.log(response.data.count);
  //       setCountMembership(response.data.count);
  //       // console.log(response.data.data.count);
  //     });
  // }, []);
  // console.log(countUser);
  const contents = [
    {
      logo: <People />,
      title: "USERS",
      // count: dashboardStats.classes,

      count: countUser,
    },
    {
      logo: <LoyaltyIcon />,
      title: "MEMBERSHIPS",
      //   count: dashboardStats.users,
      //   count: 20,
      count: countMembership,
    },
    {
      logo: <CardMembershipIcon />,
      title: "ACTIVE MEMBERSHIP",
      //   count: dashboardStats.users,
      //   count: 20,
      count: countActiveMembership,
    },
    {
      logo: <AttachMoneyTwoToneIcon />,
      title: "TOTAL EARNING (RS)",
      //   count: dashboardStats.users,
      // count: 20,
      count: countPrice,
    },
    {
      logo: <Inventory2OutlinedIcon />,
      title: "TOTAL PACKAGES",
      //   count: dashboardStats.users,
      // count: 20,
      count: countPackage,
    },
  ];

  return (
    // <>
    //   {display ? (
    // {countUser && countMembership ? }
    <>
      <Stack bgcolor="primary" flexWrap="wrap">
        <Typography variant="h5">Hey Admin</Typography>
        <Typography variant="h6">
          Here is an analytics of your portal!
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          // { 'column' : 'row'}
          gap={4}
          mt={4}
        >
          {contents.map((item) => (
            <Box
              minHeight="150px"
              width="230px"
              pt={3}
              textAlign="center"
              key={item.title}
              sx={{
                border: "1px solid grey",
                boxShadow: 2,
                borderRadius: "10px",
              }}
            >
              <Box sx={{ color: "#00A36C" }}>{item.logo}</Box>
              <Typography variant="h6" component="h6" sx={{ color: "#00A36C" }}>
                {item.title}
              </Typography>
              {/* {isLoading ? ( */}
              {/* //{" "} */}
              {/* <> */}
              <Typography variant="h6">
                {/* {item.count ? item.count : <Progress />} */}
                {item.count}
              </Typography>
              {/* </> */}
              {/* // ) : ( // <Progress /> */}
              {/* // )} */}
            </Box>
          ))}
        </Stack>
      </Stack>
      {/* </>
      ) : (
        <>
          <Login />
        </>
      )} */}
    </>
  );
}

export default DashboardContent;
