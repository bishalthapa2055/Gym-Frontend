import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Stack,
  Popover,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { experimentalStyled } from "@mui/material";
// import ExpandMoreTwoToneIcon from "@material-ui/icons/ExpandMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

// import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
// import { adminService } from "../../http/admin-service";

const UserBoxButton = experimentalStyled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
        color: ${lighten(theme.palette.primary.light, 0.5)}
`
);

const MenuUserBox = experimentalStyled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = experimentalStyled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
         color: ${lighten(theme.palette.primary.dark, 0.5)}
`
);

const UserBoxLabel = experimentalStyled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
         color: ${theme.palette.primary.dark}

        display: block;
        // white-space: nowrap;
`
);

const UserBoxDescription = experimentalStyled(Typography)(
  ({ theme }) => `
        // color: ${(theme.palette.primary.light, 0.4)};
`
);

function HeaderUserbox() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.user);

  //   useEffect(() => {
  //     adminService.getProfile(dispatch);
  //   }, [dispatch]);

  const navigate = useNavigate();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      debugger;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* {profile && ( */}
      <>
        <UserBoxButton ref={ref} onClick={handleOpen}>
          <Avatar />
          <Hidden mdDown>
            <UserBoxText>
              <UserBoxLabel variant="body1">
                {/* {profile ? profile.name : "Admin"}A */}ADMIN
              </UserBoxLabel>
            </UserBoxText>
          </Hidden>

          <Hidden mdDown></Hidden>
        </UserBoxButton>
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <UserBoxText>
              {/* <UserBoxLabel variant="body1">{profile.name}</UserBoxLabel> */}
              <UserBoxDescription variant="body2">
                {/* {profile.role} */}
                ADMIN
              </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>

          <Divider />
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              fullWidth
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/login", {
                  replace: true,
                });
              }}
            >
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Sign out
            </Button>
          </Box>
        </Popover>
      </>
      {/* )} */}
    </>
  );
}

export default HeaderUserbox;
