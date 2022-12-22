import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUserForm from "./DeleteUserForm";
import {
  TablePagination,
  Stack,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../User/Userheader";
import Search from "@mui/icons-material/Search";
import EditUserForm from "./EditUserForm";
import { adminService } from "../../http/admin-services";

function Userstable() {
  const [users, setUsers] = useState("");
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [deleteDailog, setDeleteDailog] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await adminService.getUser();
      console.log(res);
    };
    fetchdata();
  }, []);
  // console.log(users);
  const openEditForm = (id, user) => {
    //open edit form
    setUserId(id);
    setCurrentUser(user);
    setModalState(!modalState);
  };
  // console.log(userId);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDeleteDialog = (id, user) => {
    // console.log(id, "clicked");
    setUserId(id);
    setCurrentUser(user);
    setDeleteDailog(!modalState);
  };
  // console.log(userId);
  return (
    <Box>
      <Header />
      <Box p={2}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <TextField
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              // onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search  Student"
              // value={dependentSearch.current}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, color: "black", backgroundColor: "#C0C0C0" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell align="right">E-MAIL</TableCell>
              <TableCell align="right">PHONE NUMBER</TableCell>
              <TableCell align="right">CREATED AT</TableCell>
              <TableCell align="right">OPERATIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="right">{data.email}</TableCell>
                  <TableCell align="right">{data.phone}</TableCell>
                  <TableCell align="right">{data.created}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => openEditForm(data._id, data)}
                        // onClick={() => alert("clicked")}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => openDeleteDialog(data._id, data)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        // count={total}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <TablePagination
        component="div"
        count={50}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {modalState && (
        <EditUserForm
          edit={true}
          id={userId}
          setModal={setModalState}
          user={currentUser}
        />
      )}
      {deleteDailog && (
        <DeleteUserForm
          id={userId}
          setModal={setDeleteDailog}
          user={currentUser}
        />
      )}
    </Box>
  );
}

export default Userstable;
