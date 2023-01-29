import React, { useState, useEffect } from "react";
import "react-toggle/style.css";
import useAuth from "../../hooks/useAuth";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { findDOMNode } from "preact/compat";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ToggleSwitch from "./ToggleSwitch";
import TableTenure from "./TableTenure";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


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
    id: "first",
    numeric: false,
    disablePadding: true,
    label: "First",
  },
  {
    id: "last",
    numeric: true,
    disablePadding: true,
    label: "Last",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "isManager",
    numeric: false,
    disablePadding: true,
    label: "Manager Status",
  },
  {
    id: "tenure",
    numeric: true,
    disablePadding: true,
    label: "Tenure (yrs)",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: true,
    label: "State",
  },
  {
    id: "pto",
    numeric: true,
    disablePadding: true,
    label: "PTO (hrs)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all employees",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="right"
            // padding={headCell.disablePadding ? "none" : "normal"}
            padding="normal"
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

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          My Team
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>{/* <FilterListIcon /> */}</IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// export default function ManageStaffList({
export default function EnhancedTable({
  getAllEmployees,
  toggle,
  setToggle,
  users,
  setUsers,
}) {

  // const _ = require("lodash");
  //   const [rows, setRows] = useState([]);
  const handleClose = () => setOpen(false);
  const [manager, setManager] = useState();
  const [managers, setManagers] = useState([]);
  const [user, token] = useAuth();
  const [open, setOpen] = useState(false);



  async function makeManager(newManager, employee) {
   
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/${employee.id}/`,
        newManager,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setManager(res.data);
      console.log(newManager)
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error making your requests!");
    }
    getAllEmployees();
  }

  function managerTrue(employee) {
    let newManager = {
      is_manager: true,
    };
    makeManager(newManager, employee);
  }
  function managerFalse(employee) {
    let newManager = {
      is_manager: false,
    };
    makeManager(newManager, employee);
  }

  function handleToggle(toggleValue, employee) {
    if (toggleValue) {
      managerTrue(employee);
    //   setToggle(toggle);
    } else {
      managerFalse(employee);
    //   setToggle(!toggle);
    }
  }



  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    getAllEmployees();
  }, []);

  function createData(
    firstName,
    lastName,
    username,
    email,
    isManager,
    tenure,
    state,
    pto
  ) {
    return {
      firstName,
      lastName,
      username,
      email,
      isManager,
      tenure,
      state,
      pto,
    };
  }
  function findRows() {
    let finalArray = [];
    finalArray = users.map((el) => {
      return {
        ...createData(
          Object.values(el.first_name),
          Object.values(el.last_name),
          Object.values(el.username),
          Object.values(el.email),
          <ToggleSwitch toggle={toggle} setToggle={handleToggle} element={el} />,
          // Object.values(el.is_manager.toString()),
          <TableTenure el = {el} getAllEmployees={getAllEmployees}/>,
          // Object.values(el.tenure.toString()),
          Object.values(el.state),
          Object.values(el.pto.toString())
        ),
      };
    });
    return finalArray;
  }

  const rows = findRows();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // function handleOpen() {
  //   setOpen(true);
  //   getAllEmployees();
  // }
  

  //async function getEmployee(employee) {

  // function handleFormSubmit(e){
  //   e.preventDefault();
  //   let employees = [...employees];
  //   employees.push({firstName: firstName, last_Name: lastName, tenure: 0, isManager : isManager});

  // };

  // function handleInputChange(e){
  //   let input = e.target;
  //   let name = e.target.name;
  //   let value = input.value;
  //   setName(value);
  // };

  return (
    <div className="table-form">
      <div className="flex-for-table">
        <Box sx={{ width: "80%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                        // hover
                        // onClick={(event) => handleClick(event, row.name)}
                        // role="checkbox"
                        // aria-checked={isItemSelected}
                        // tabIndex={-1}
                        // key={row.name}
                        // selected={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          /> */}
                          {/* </TableCell> */}
                          {/* <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell> */}
                          <TableCell align="right">{row.firstName}</TableCell>
                          <TableCell align="right">{row.lastName}</TableCell>
                          <TableCell align="right">{row.username}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.isManager}</TableCell>
                          <TableCell align="right">{row.tenure}</TableCell>
                          <TableCell align="right">{row.state}</TableCell>
                          <TableCell align="right">{row.pto}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
        </Box>{" "}
      </div>
    </div>
  );
}
