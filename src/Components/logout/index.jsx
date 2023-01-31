import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Box, Divider, Hidden } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { useSelector } from "react-redux";
import { auth, firebase } from "../../firebase_config";
import { useSnackbar } from "notistack";
export default function LogOut() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const data = useSelector((state) => state.login.data);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = async (e) => {
    e.preventDefault();

    await firebase
      .auth()
      .signOut()
      .then(function () {
        // console.log("Successfully signed out.");
        localStorage.removeItem("accessToken");
        enqueueSnackbar("Log Out Sucessfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });

        navigate("/login", {
          replace: true,
        });
        window.location.reload();
      })
      .catch(function (error) {
        // console.log(error);
        // console.log("An error occurred");
      });
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        // aria-describedby={id} variant="contained"
        onClick={handleClick}
      >
        <Avatar color="red" />
        <Hidden mdDown>
          <Typography
            // variant="h6"
            // component="h6"
            // gutterBottom
            sx={{ color: "red" }}
            // align="center"
            // border="1px solid black"
          >
            ADMIN
          </Typography>
        </Hidden>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2 }}>{data.phone}</Typography>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            fullWidth
            //   onClick={
            //     () =>
            //      {
            //     localStorage.removeItem("accessToken");
            //     navigate("/login", {
            //       replace: true,
            //     });
            //      }
            // }
            onClick={logout}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
