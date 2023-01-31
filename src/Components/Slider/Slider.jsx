import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate, Outlet } from "react-router-dom";
import { Dashboard, People } from "@mui/icons-material";
// import PersonIcon from "@mui/icons-material/Person";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
// import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase } from "../../firebase_config";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
// import firebase from "firebase";
// import { auth } from "../../firebase_config.js";
// import { firebase } from "./firebase_config";
import Login from "../../login";
import { useSnackbar } from "notistack";
import { Stack } from "@mui/system";
import LogoutDailog from "./logoutDailog";
import HeaderUserbox from "../logout/logout";
import logout from "../logout";
import LogOut from "../logout";

const drawerWidth = 240;

const data = [
  {
    title: "Dashboard",
    Link: "/",
    // Link to={{ pathname: "/dashboard" }}
    icon: <Dashboard />,
  },

  {
    title: "USERS",
    Link: "/users",
    icon: <People />,
  },
  {
    title: "MEMBERSHIPS",
    Link: "/memberships",
    icon: <LoyaltyIcon />,
  },
  {
    title: "PACKAGES",
    Link: "/packages",
    icon: <InventoryIcon />,
  },
  {
    title: "PROFILE",
    Link: "/profile",
    icon: <PersonIcon />,
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
// const MainContent = experimentalStyled(Box)(
//   ({ theme }) => `

//         flex: 1 1 auto;
//         overflow: auto;
// `
// );

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Slider() {
  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [user] = useAuthState(auth);
  const [logoutDailog, setLogoutDailog] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logOut = () => {
    setLogoutDailog(true);
    setModalState(!modalState);
  };
  const Logout = async (e) => {
    /*
    // firebase
    // .auth()
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        console.log("out");
        // setLogout(true);
        // navigate("/");
        // alert("sucessfully logged out");
      })
      .catch((error) => {
        console.error(error);
      });
*/

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

        navigate("/login");
      })
      .catch(function (error) {
        // console.log(error);
        // console.log("An error occurred");
      });

    // this.props.history.push("/");
    // navigate("/login");

    // if (user) {
    // alert("clicked");
    // auth.signOut();
    // navigate("/");
    // setLogout(true);
    // }
  };

  return (
    <>
      {/* {logout ? (
        <Login />
      ) : (
        <> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ background: "#F3F7F8" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}

            // sx={boxDefault}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  // mr: 2,
                  width: "fit-content",

                  color: "red",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: "#00A36C" }}
              >
                GYM APP
              </Typography>
            </Stack>

            {/* <LogoutIcon
              sx={{ color: "red ", cursor: "pointer" }}
              color="red "
              // onClick={Logout}
              onClick={logOut}
            /> */}
            {/* // for logout */}
            <LogOut />
            {/* <HeaderUserbox /> */}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: "red",
              }}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            sx={{
              height: "100%",
              background: "#F3F7FB",
            }}
          >
            {data.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.Link)}
                  style={{ gap: "10px" }}
                >
                  {/* <ListItemIcon /> */}

                  {/* <ListItemText primary={item.title}  /> */}
                  {/* <ListItemText> */}
                  <Button
                    size="large"
                    sx={{ color: "#00A36C" }}
                    // onClick={item.Link}
                    // onClick={() => navigate(item.Link)}
                  >
                    {item.icon}
                    <Typography variant="subtitle1" ml={2}>
                      {item.title}
                    </Typography>
                  </Button>
                  {/* </ListItemText> */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {/* <Typography paragraph>Lorem ipsum dolor sit amet</Typography> */}
          {/* <MainContent> */}
          <Outlet />
          {/* </MainContent> */}
        </Main>
      </Box>
      {modalState && (
        <LogoutDailog logout={logoutDailog} setModal={setModalState} />
      )}
    </>
    //   )}
    // </>
  );
}
