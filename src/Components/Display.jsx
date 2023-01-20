import React from "react";
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
} from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";

const Display = ({ id, setModal, user }) => {
  return (
    <Dialog
      maxWidth="md"
      height="50%"
      open={true}
      sx={{ backgroundColor: "#EAF3FE" }}
    >
      <Card sx={{ maxWidth: 345, height: "30%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={user.image}
            alt="profile-pic"
          />
          <CardContent sx={{ backgroundColor: "#EBF6F4" }}>
            <Typography gutterBottom variant="h6" component="div">
              Name : {user.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              E-Mail: {user.email}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Phone : {user.phone}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Emergency No. : {user.emergency_number}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Created : {user.created}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <DialogActions sx={{ p: 1, backgroundColor: "#EBF6F4" }}>
        <Button color="secondary" onClick={() => setModal((prev) => !prev)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Display;
