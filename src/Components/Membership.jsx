import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { FlashOffOutlined } from "@mui/icons-material";
import { api } from "../http/api";
import Header from "./Membership/Header";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, Stack } from "@mui/material";
import Progress from "./Progress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteMembershipForm from "./Membership/DeleteMembershipForm";
import { adminService } from "../http/admin-services";
import EditMembershipForm from "./Membership/EditMembershipForm";
import Buttons from "./Membership/buttons";
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
  const stabilizedThis = array.map((el, index) => [el, index]);
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
    label: "NAME",
  },
  {
    id: "packname",
    numeric: FlashOffOutlined,
    disablePadding: false,
    label: "PACKAGE NAME",
  },
  {
    id: "pay",
    numeric: false,
    disablePadding: false,
    label: "PAYMENT",
  },
  {
    id: "start",
    numeric: true,
    disablePadding: false,
    label: "START DATE",
  },
  {
    id: "end",
    numeric: true,
    disablePadding: false,
    label: "END DATE",
  },
  {
    id: "amt",
    numeric: true,
    disablePadding: false,
    label: "AMOUNT",
  },
  {
    id: "oper",
    numeric: false,
    disablePadding: false,
    label: "OPERATION",
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
//   return (
//     // <Typography
//     //   sx={{ flex: "1 1 100%" }}
//     //   variant="h6"
//     //   id="tableTitle"
//     //   component="div"
//     // >
//     //   Nutrition
//     // </Typography>
//     // <Typography variant="h6" component="h6" gutterBottom>
//     //   Memberships Details
//     // </Typography>

//     // import { Button, Typography, Grid } from "@mui/material";
//   );
// }

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [memberships, setMemberships] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [membershipId, setMembershipId] = React.useState();
  const [currentmembership, setCurrentMembership] = React.useState();
  const [modalState, setModalState] = React.useState(false);
  const [deleteDailog, setDeleteDailog] = React.useState(false);
  const [editDailog, setEditDailog] = React.useState(false);
  const [countActive, setCountActive] = React.useState();
  const [countAll, setCountAll] = React.useState();
  const [countInActive, setCountInActive] = React.useState();
  const [countExpired, setCountExpired] = React.useState();

  const dispatch = useDispatch();
  const membershipDetails = useSelector(
    (state) => state.memberships.memberships
  );
  // console.log(membershipDetails.length);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = memberships.map((n) => n.name);
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
  React.useEffect(() => {
    // axios
    //   .get("http://localhost:8888/membership/memberships")
    //   .then((res) => setMemberships(res.data.data))
    //   .catch((err) => console.log(err));

    const fetchData = async () => {
      const response = await adminService.getMembership(dispatch);
      // console.log(
      //   "🚀 ~ file: Membership.jsx:244 ~ fetchData ~ response",
      //   response.data.data.length
      // );
      setCountAll(response.data.data.length);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  const handleAll = async () => {
    // alert(" handle all list");

    const response = await adminService.getMembership(dispatch);
    // console.log(
    //   "🚀 ~ file: Membership.jsx:249 ~ handleAll ~ response",
    //   response.data.data.length
    // );
    setCountAll(response.data.data.length);
  };

  const handleActive = async () => {
    const response = await adminService.activeList(dispatch);
    // console.log(response.data.count);
    setCountActive(response.data.count);
  };
  const handleInActive = async () => {
    // alert("handle InActive hist");
    const response = await adminService.inactiveList(dispatch);
    setCountInActive(response.data.count);
  };
  const handleExpired = async () => {
    const response = await adminService.expiredList(dispatch);
    setCountExpired(response.data.count);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const openDeleteMebershipDialog = (id, membership) => {
    //sending the memebership id and values to the new tab

    setMembershipId(id);
    setCurrentMembership(membership);
    setDeleteDailog(!modalState);
  };

  const openEditMembershipForm = (id, membership) => {
    setMembershipId(id);
    setCurrentMembership(membership);
    setEditDailog(!modalState);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      {loading ? (
        <Progress />
      ) : (
        <>
          <Box sx={{ width: "100%" }}>
            <Header />
            {/* <Buttons count={membershipDetails.length} /> */}

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={handleAll}>
                ALL {countAll ? countAll : membershipDetails.length}
              </Button>
              <Button variant="outlined" color="success" onClick={handleActive}>
                ACTIVE {countActive ? countActive : ""}
              </Button>
              <Button variant="outlined" color="error" onClick={handleInActive}>
                INACTIVE {countInActive ? countInActive : ""}
              </Button>
              <Button variant="outlined" color="error" onClick={handleExpired}>
                EXPIRED {countExpired ? countExpired : ""}
              </Button>
            </Stack>
            <Paper
              sx={{ width: "100%", mb: 2, mt: 2, backgroundColor: "#C4FAC3" }}
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
                    rowCount={membershipDetails.length}
                  />
                  <TableBody sx={{ backgroundColor: "#EDF3E8" }}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(ge tComparator(order, orderBy)).slice() */}

                    {membershipDetails &&
                      stableSort(
                        membershipDetails,
                        getComparator(order, orderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        ?.map((row, index) => {
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.id)}
                              // role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              // key={row.id}
                              // selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /> */}
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.userId?.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.package?.name
                                  ? row.package?.name
                                  : "Your Packages Expired"}
                              </TableCell>
                              <TableCell align="right">
                                {row.payment?.paid_via}
                              </TableCell>
                              <TableCell align="right">
                                {moment
                                  .unix(row?.start_date)
                                  .format("MM-DD-YYYY")}
                              </TableCell>
                              <TableCell align="right">
                                {moment
                                  .unix(row?.end_date)
                                  .format("MM-DD-YYYY")}
                              </TableCell>
                              <TableCell align="right">
                                {row?.package?.price
                                  ? row?.package?.price
                                  : "Packages Expired"}
                              </TableCell>

                              <TableCell>
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
                                      () =>
                                        openEditMembershipForm(row.id, row) &&
                                        console.log(row)
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
                                    onClick={() =>
                                      openDeleteMebershipDialog(row.id, row)
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
                colSpan={4}
                count={membershipDetails ? membershipDetails.length : null}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: "#D8E6CC" }}
              />
              {deleteDailog && (
                <DeleteMembershipForm
                  id={membershipId}
                  membership={currentmembership}
                  setModal={setDeleteDailog}
                />
              )}
              {editDailog && (
                <EditMembershipForm
                  id={membershipId}
                  membership={currentmembership}
                  setModal={setEditDailog}
                />
              )}
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}
