import { CircularProgress } from "@mui/material";
import { Stack, Box } from "@mui/material";
import React from "react";

const Progress = () => {
  return (
    <Box
      display="flex"
      sx={{
        position: "absolute",
        top: "50%",
        left: {
          lg: "58%",
          xs: "50%",
        },
        thickness: 5,
      }}
      justifyContent="center"
    >
      {/* // <Stack sx={{ display: "flex", thickness: 5 }} direction="horizontal"> */}
      <CircularProgress style={{ color: "red" }} />
      {/* </Stack> */}
    </Box>
  );
};

export default Progress;
