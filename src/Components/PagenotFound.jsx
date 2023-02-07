import { Typography, Grid, Box } from "@mui/material";

const Pagenotfound = () => {
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
            OOPS ! ! 404 ERROR
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            align="center"
            sx={{ color: "red" }}
          >
            PAGE NOT FOUND
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            align="center"
            sx={{ color: "black" }}
          >
            Please Refresh the Page
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default Pagenotfound;
