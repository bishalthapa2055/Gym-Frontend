import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
// import Sidebar from "@/src/page-components/sidebar";
// import SchoolIcon from "@mui/icons-material/School";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import { adminService } from "@/src/http/admin-service";
// import { useAppDispatch, useAppSelector } from "@/src/hooks/hooks";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

import { People } from "@mui/icons-material";

function DashboardContent() {
  const [countUser, setCountUser] = useState("");
  const [countMembership, setCountMembership] = useState("");
  //   const dispatch = useAppDispatch()
  //   const dashboardStats = useAppSelector((state) => state.dashboard);

  //   useEffect(() => {
  //     adminService.getStats(dispatch);
  //   }, [dispatch]);
  useEffect(() => {
    axios
      .get("https://gymmvp.herokuapp.com/api/web/users/count")
      .then(function (response) {
        // console.log(response.data.count);
        setCountUser(response.data.count);
        // console.log(response.data.data.count);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://gymmvp.herokuapp.com/api/web/membership/count")
      .then(function (response) {
        // console.log(response.data.count);
        setCountMembership(response.data.count);
        // console.log(response.data.data.count);
      });
  }, []);
  console.log(countUser);
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
  ];

  return (
    <Stack bgcolor="primary" flexWrap="wrap">
      <Typography variant="h5">Hey Admin</Typography>
      <Typography variant="h6">Here is an analytics of your portal!</Typography>
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
            <Typography variant="h6">{item.count}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default DashboardContent;
