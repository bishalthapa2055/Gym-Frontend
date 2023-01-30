import React from "react";

import Box from "@mui/material/Box";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const loginDetails = useSelector((state) => state.login.data);
  console.log("🚀 ~ file: index.jsx:15 ~ index ~ loginDetails", loginDetails);
  return (
    <Card sx={{ maxWidth: 345, height: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={loginDetails.image}
          alt="profile-pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name : {loginDetails.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            E-Mail :{loginDetails.email}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Phone :{loginDetails.phone}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Emer. No :{loginDetails.emergency_number}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Created At :{loginDetails.created}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Admin :{loginDetails.isAdmin}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Index;
