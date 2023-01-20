import { Typography, Grid, Box } from "@mui/material";

const Notallowded = () => {
  return (
    <>
      <Box
        mt={25}
        sx={{
          width: "auto",
          height: "auto",
          // backgroundColor: "grey",
          align: "center",
        }}
      >
        <Grid item>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            align="center"
            sx={{ color: "red" }}
          >
            OOPS !! ERROR
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ color: "red" }}
          >
            YOU ARE NOT ALLOWDED TO ENTER !!!!
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            align="center"
            sx={{ color: "black" }}
          >
            Please Refresh the Page to LOGIN
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default Notallowded;
