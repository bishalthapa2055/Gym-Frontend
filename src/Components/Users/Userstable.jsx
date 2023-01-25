import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteUserForm from "./DeleteUserForm";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  TablePagination,
  Stack,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../User/Userheader";
import Search from "@mui/icons-material/Search";
import EditUserForm from "./EditUserForm";
import { adminService } from "../../http/admin-services";
import Display from "../Display";

import Progress from "../Progress";
import { api } from "../../http/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

function Userstable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteDailog, setDeleteDailog] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [openViewDialog, setopenViewDialog] = useState(false);
  // const [data, setData] = useState([]);
  // const [isLoading, setisLoading] = React.useState(true);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [select, setSelect] = useState("all");
  const [searchUser, setSearchUser] = React.useState([]);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.users);
  const result = useSelector((state) => state.user.result);
  const total = useSelector((state) => state.user.total);
  // console.log("🚀 ~ file: Userstable.jsx:57 ~ Userstable ~ total", total);
  console.log(
    "🚀 ~ file: Userstable.jsx:46 ~ Userstable ~ searchTerm",
    searchTerm
  );
  const { data, isLoading } = useQuery(
    ["Users", dispatch, searchTerm, rowsPerPage, page, select, sortBy],
    () => {
      adminService.getUserss(dispatch, {
        searchTerm,
        rowsPerPage,
        page,
        select,
        sortBy,
      });
    }
  );

  // console.log("data", data);
  // console.log(userDetails.length);

  // useEffect(() => {

  //   adminService.getUserss(dispatch, {
  //     searchTerm,
  //     rowsPerPage,
  //     page,
  //     select,
  //     sortBy,
  //   });
  //   setLoading(false);
  // }, [dispatch]);

  /*
  useEffect(() => {
    // setLoading(true);
    const fetchdata = async () => {
      // const res = await axios.get("http://localhost:8888/users/displays");
      const res = adminService.getUserss(dispatch);
      if (res) {
        // setUsers(res.data.data);
        setLoading(false);
      }
    };

    fetchdata();
    // },
  }, [dispatch]);

  */

  const openEditForm = (id, user) => {
    //open edit form
    setUserId(id);
    setCurrentUser(user);
    setModalState(!modalState);
  };
  // console.log(userId);

  const changeSearchTerm = (e) => {
    // console.log("search", e.target.value);
    const search = e.target.value;
    console.log(
      "🚀 ~ file: Userstable.jsx:120 ~ changeSearchTerm ~ search",
      search
    );

    setSearchTerm(search);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const openDeleteDialog = (id, user) => {
    // console.log(id, "clicked");
    setUserId(id);
    setCurrentUser(user);
    setDeleteDailog(!modalState);
  };
  const openDialog = (id, user) => {
    setUserId(id);
    setCurrentUser(user);
    setopenViewDialog(!modalState);
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
              onChange={changeSearchTerm}
              placeholder="Search  Users"
              // value={dependentSearch.current}
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />

      {/* {isLoading ? (
        <Progress />
      ) : ( */}
      <>
        <TableContainer
          sx={{ width: "100%" }}
          component={Paper}
          // rowCount={users.length}
        >
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
                <TableCell align="center">OPERATIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {loading ? (
              <Progress />
            ) : (
              <> */}
              {userDetails &&
                userDetails?.length &&
                userDetails?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ) &&
                userDetails
                  ?.filter(
                    (user) =>
                      user.name.toLowerCase().includes(searchUser) ||
                      user.email.toLowerCase().includes(searchUser) ||
                      user.phone.includes(searchUser)
                  )
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ) &&
                userDetails?.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                    <TableCell align="right">{data.email}</TableCell>
                    <TableCell align="right">{data.phone}</TableCell>
                    <TableCell align="right">
                      {/* {data.created} */}

                      {moment(data.created).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={3}
                        justifyContent="center"
                        display="flex"
                      >
                        {/* <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => openEditForm(data._id, data)}
                        // onClick={() => alert("clicked")}
                      >
                        Edit
                      </Button> */}
                        <EditIcon
                          sx={{
                            "& :hover": { color: "red" },
                            cursor: "pointer",
                            color: "blue",
                          }}
                          onClick={() => openEditForm(data.id, data)}
                        />
                        {/* <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => openDeleteDialog(data._id, data)}
                      > */}
                        {/* Delete */}
                        <DeleteOutlineOutlinedIcon
                          sx={{
                            "& :hover": { color: "red" },
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={() => openDeleteDialog(data.id, data)}
                        />
                        {/* </Button> */}
                        {/* <Button
                        variant="contained"
                        startIcon={<PreviewOutlinedIcon />}
                        onClick={() => openDeleteDialog(data._id, data)}
                      >
                        View
                      </Button> */}
                        <RemoveRedEyeOutlinedIcon
                          sx={{
                            "& :hover": { color: "red" },
                            cursor: "pointer",
                            color: "green",
                          }}
                          onClick={() => openDialog(data.id, data)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              {/* </>
            )} */}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            component="div"
            count={result ? result : total}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </>
      {/* )} */}

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
      {openViewDialog && (
        <Display id={userId} setModal={setopenViewDialog} user={currentUser} />
      )}
    </Box>
  );
}

export default Userstable;
