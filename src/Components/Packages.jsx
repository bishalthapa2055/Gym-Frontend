import * as React from "react";
import PropTypes from "prop-types";
import { Box, Stack, TableCell } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { api } from "../http/api";
import axios from "axios";
import Progress from "./Progress";

import Header from "./Packages/index";
import EditPackagesForm from "./Packages/EditPackagesForm";
import DeletePackagesForm from "./Packages/DeletePackagesForm";
import CustomizedMenus from "./Packages/options";
import UpdateStatus from "./Packages/UpdateStatus";
import { adminService } from "../http/admin-services";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "PACKAGES NAME",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "DISCOUNT PERCENTAGE (%)",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "DURATION ( DAYS )",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "PRICE ( RS )",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "operation",
    numeric: true,
    disablePadding: false,
    label: "OPERATIONS",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
      // sx={{backgroundColor : '#40E0D0'}}
      >
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            // sx={{ color: "red" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//   // const { numSelected } = props;

//   return (
//     <Typography
//       sx={{ flex: "1 1 100%" }}
//       variant="h6"
//       id="tableTitle"
//       component="div"
//     >
//       Nutrition
//     </Typography>
//   );
// }

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [packages, setPackages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalState, setModalState] = React.useState(false);
  const [packagesId, setPackagesId] = React.useState("");
  const [currentPackages, setCurrentPackages] = React.useState("");
  const [deleteDailog, setDeleteDailog] = React.useState(false);
  const [optionId, setOptionId] = React.useState("");

  const [packagesStatus, setPackagesStatus] = React.useState();
  const [updateStatusModel, setUpdateStatusModel] = React.useState(false);

  const dispatch = useDispatch();
  const packagesDetails = useSelector((state) => state.packages.packages);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = packagesDetails.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEditPackagesForm = (id, packages) => {
    setPackagesId(id);
    setModalState(!modalState);
    setCurrentPackages(packages);
  };
  const openDeletePackagesDialog = (id, packages) => {
    setPackagesId(id);
    setCurrentPackages(packages);
    setDeleteDailog(!modalState);
  };

  const closeModel = () => {
    setUpdateStatusModel((prev) => !prev);
  };

  // const updateClass = async (id, packagesStatus) => {
  //   try {
  //     // const id = optionId;
  //     const url = `http://localhost:8888/package/packages/${id}`;
  //     console.log(
  //       "🚀 ~ file: Packages.jsx:237 ~ updateClass ~ packagesStatus",
  //       packagesStatus
  //     );

  //     console.log(
  //       "🚀 ~ file: Packages.jsx:240 ~ updateClass ~ optionId",
  //       optionId
  //     );
  //     await axios.patch(url, {
  //       status: packagesStatus,
  //     });
  //     setUpdateStatusModel((prev) => !prev);
  //   } catch (error) {
  //     // enqueueSnackbar("Failed to update class", {
  //     //   variant: "error",
  //     //   anchorOrigin: {
  //     //     vertical: "top",
  //     //     horizontal: "right",
  //     //   },
  //     // });
  //     console.log(error);
  //   }
  // };
  // const fetchdata = async () => {
  //   const data = await api.get("/packages");
  //   console.log("packages", data);
  // };
  // fetchdata();
  React.useEffect(() => {
    // setTimeout(() => {
    // axios
    //   .get("http://localhost:8888/package/packages")
    //   .then((res) => setPackages(res.data.data) && console.log("res", res))
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
    adminService.getPackages(dispatch);
    setLoading(false);
    // }, 1000);
  }, [dispatch]);
  // React.useEffect(() => {
  // const fetchdata = async () => {
  // const res = await adminService.getUser();
  // console.log(res);
  // setLoading(true);
  // const fetchdata = async () => {
  //   const res = await api.get("/packages");
  //   if (res) {
  //     setPackages(res.data);
  //     setLoading(false);
  //   }

  // .then((res) => setUsers(res.data.data))
  // .catch((err) => console.log(err))
  // .finally(() => setLoading(false));
  // };

  // fetchdata();
  // },
  // }, []);

  console.log(packages);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      {loading ? (
        <Progress />
      ) : (
        <>
          <Box sx={{ width: "95%" }}>
            {/* <Typography
              variant="h6"
              component="h6"
              m={2}
              gutterBottom
              // sx={{ color: "#FA3322" }}
            >
              Lists of Availabe Packages
            </Typography> */}
            {/* <packagesHeader /> */}
            {/* <packagesHeader /> */}
            <Header />
            <Paper
              sx={{
                width: "100%",
                mb: 2,
                backgroundColor: "#C4FAC3",
              }}
            >
              {/* <EnhancedTableToolbar numSelected={selected.length} /> */}

              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  // size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    // numSelected={selected.length}
                    sx={{ backgroundColor: "#EDF3E8" }}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={packagesDetails.length}
                  />
                  <TableBody sx={{ backgroundColor: "#EDF3E8" }}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                    {packagesDetails &&
                      packagesDetails.length &&
                      stableSort(packagesDetails, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        ?.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.name)}
                              // role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              // selected={isItemSelected}
                            >
                              <TableCell padding="checkbox"></TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.discount_percentage}
                              </TableCell>
                              <TableCell align="right">
                                {row.duration_in_days}
                              </TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="center">
                                {/* {row.status} */}
                                {/* <CustomizedMenus /> */}
                                <select
                                  value={row.status}
                                  onChange={(e) => {
                                    setOptionId(row.id);
                                    console.log(row.id);
                                    setPackagesStatus(e.target.value);
                                    setUpdateStatusModel(true);
                                  }}
                                >
                                  <option value="draft">Draft</option>
                                  <option value="published">Published</option>
                                </select>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  alignItems="right"
                                  spacing={3}
                                  display="flex"
                                >
                                  <EditIcon
                                    sx={{
                                      "& :hover": { color: "red" },
                                      cursor: "pointer",
                                      color: "blue",
                                    }}
                                    onClick={
                                      () => openEditPackagesForm(row.id, row)
                                      // alert("hello")
                                      // console.log(row._id, row)
                                    }
                                  />
                                  <DeleteOutlineOutlinedIcon
                                    sx={{
                                      "& :hover": { color: "red" },
                                      cursor: "pointer",
                                      color: "red",
                                    }}
                                    onClick={
                                      () =>
                                        openDeletePackagesDialog(row.id, row)
                                      // alert("hello")
                                    }
                                  />
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={packagesDetails ? packagesDetails.length : null}
                // count={packagesDetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: "#D8E6CC" }}
              />
              {modalState && (
                <EditPackagesForm
                  edit={true}
                  id={packagesId}
                  setModal={setModalState}
                  packages={currentPackages}
                />
              )}

              {deleteDailog && (
                <DeletePackagesForm
                  id={packagesId}
                  setModal={setDeleteDailog}
                  packages={currentPackages}
                />
              )}
            </Paper>

            {updateStatusModel && (
              <UpdateStatus
                closeFunction={closeModel}
                // updateFunction={optionId}
                setModel={updateStatusModel}
                id={optionId}
                status={packagesStatus}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
}
