import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-toggle/style.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ToggleSwitch from "./ToggleSwitch";
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
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { findDOMNode } from "preact/compat";

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

// function createData(
//   firstName,
//   lastName,
//   username,
//   email,
//   isManager,
//   tenure,
//   state,
//   pto
// ) {
//   return {
//     firstName,
//     lastName,
//     username,
//     email,
//     isManager,
//     tenure,
//     state,
//     pto,
//   };
// }

// const rows = [
//   users?.map((el, index) => {
//     console.log(el);
//     return createData(
//       el.first_name,
//       el.last_name,
//       el.username,
//       el.email,
//       el.is_manager,
//       el.tenure,
//       el.state,
//       el.pto
//     );
//   }),
// ];

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
    disablePadding: false,
    label: "Last",
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "isManager",
    numeric: false,
    disablePadding: false,
    label: "Manager Status",
  },
  {
    id: "tenure",
    numeric: true,
    disablePadding: false,
    label: "Tenure (yrs)",
  },
  {
    id: "state",
    numeric: true,
    disablePadding: false,
    label: "State",
  },
  {
    id: "pto",
    numeric: true,
    disablePadding: false,
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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
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
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ManageStaffList({
  // export default function EnhancedTable({
  getAllEmployees,
  toggle,
  setToggle,
  users,
  setUsers,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "75%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };

  const handleClose = () => setOpen(false);
  const [user, token] = useAuth();
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tenure, setTenure] = useState(0);
  const [state, setState] = useState("");
  const [pto, setPto] = useState(0);
  const _ = require("lodash");
  //   const [rows, setRows] = useState([]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    getAllEmployees();
  }, []);
//   useEffect(() => {
//     // findRows();
//     // tryRows();
//     // createData();
//   }, [users]);

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
  //   let mappedUsers = [];
  //   mappedUsers = users?.map(
  //     (el) => {
  //       return (
  //         Object.values([
  //           el.first_name,
  //           el.last_name,
  //           el.username,
  //           el.email,
  //           el.is_manager,
  //           el.tenure,
  //           el.state,
  //           el.pto,
  //         ])
  //       );
  //     })
//   const rows = [
//     users?.map((el) => {
//       return (Object.values([
//         el.first_name,
//         el.last_name,
//         el.username,
//         el.email,
//         el.is_manager,
//         el.tenure,
//         el.state,
//         el.pto,
//       ]))
//     }),
//   ];

  // createData(users?.map(
  //   (el) => {
  //     return (
  //       Object.values([
  //         el.first_name,
  //         el.last_name,
  //         el.username,
  //         el.email,
  //         el.is_manager,
  //         el.tenure,
  //         el.state,
  //         el.pto,
  //       ])
  //     );
  //   })
  //   setRows([mappedUsers, ...rows]),
function findRows(){

let finalArray = []
    finalArray=users.map((el => {
        return {
            ...createData((Object.values(el.first_name)),
            (Object.values(el.last_name)),
           (Object.values(el.username)),
            (Object.values(el.email)),
            (Object.values(el.is_manager)),
            (Object.values(el.tenure)),
            (Object.values(el.state)),
            (Object.values(el.pto)))
        }}))
        console.log(finalArray)
return finalArray
    // const initialValue = 0;
    // let newList= [];
    // newList = users.map((el=> {
    // return (Object.values(el))}))
    // debugger
    // return newList
    }

        const rows = findRows();


// const rows =  [
    // users.map((el => {
    //     return {
    //         ...createData((Object.values(el.first_name)),
    //         (Object.values(el.last_name)),
    //        (Object.values(el.username)),
    //         (Object.values(el.email)))
    //         // (Object.values(el.is_manager)),
    //         // (Object.values(el.tenure)),
    //         // (Object.values(el.state)),
    //         // (Object.values(el.pto)))
    //     }}))

    
// ]
// console.log(rows)





// const rows =  [...((findRows()).map(
    
//             (el) => { 
//               return ({
//                 ...             
//                  el.map((element)=> {
//                     return{
//                     ...
//             createData((element))}})})}))]
            // (el)=> {
                // return(
                   
                    // return( ..., createData(el))})))]
                        
            // ... [Object.values(el.last_name)],
            // ... [Object.values(el.username)]

                            // createData(Object.values(el.username)),
                // createData(Object.values(el.email))
                // createData(Object.values(el.is_manager)),
                // createData(Object.values(el.tenure)),
                // createData(Object.values(el.state)),
                // createData(Object.values(el.pto)))}))]
               //   el.last_name,
                //   el.username,
                //   el.email,
                //   el.is_manager,
                //   el.tenure,
                //   el.state,
                //   el.pto
         
    
//RETURNS FIRST NAMES
// const rows =  [...(users?.map(
//             (el) => { 
//               return (
//                 createData(Object.values(
//                   el.first_name,
//                   el.last_name,
//                   el.username,
//                   el.email,
//                   el.is_manager,
//                   el.tenure,
//                   el.state,
//                   el.pto
//                 ))
//               )
//             }))]

        




  //THIS RETRNS A STRING
//     const rows = [
//       createData(users?.map(
//         (el) => {
//           return (
//             Object.values([
//               el.first_name,
//               el.last_name,
//               el.username,
//               el.email,
//               el.is_manager,
//               el.tenure,
//               el.state,
//               el.pto,
//             ])
//           );
//         })
//   //       //   setRows([mappedUsers, ...rows]),
//       ),
//     ];
//   console.log(rows);




  //    let mappedUsers = [];
  //     users?.map((el)=> {
  //             return(mappedUsers.push(Object.values(([el.first_name,
  //                     el.last_name,
  //                     el.username,
  //                     el.email,
  //                     el.is_manager,
  //                     el.tenure,
  //                     el.state,
  //                     el.pto]))))},
  //                     setRows([mappedUsers, ...rows])   ,
  //                     console.log([mappedUsers, ...rows])

  //     return {
  //       firstName,
  //       lastName,
  //       username,
  //       email,
  //       isManager,
  //       tenure,
  //       state,
  //       pto,
  //     };
  //   }

  //   function generateRows() {
  //    let mappedUsers=[];
  // //    mappedUsers=
  // let finalArray = [];
  // users?.map((el)=> {
  //     return( createData(mappedUsers.push([el.first_name,
  //             el.last_name,
  //             el.username,
  //             el.email,
  //             el.is_manager,
  //             el.tenure,
  //             el.state,
  //             el.pto])))
  // })
  // finalArray = (Object.values(mappedUsers))
  // setRows(finalArray)
  // console.log(finalArray)

  // let mappedUsers = users?.map((el) => {
  //         return (
  //         //   createData(
  //             el.first_name,
  //             el.last_name,
  //             el.username,
  //             el.email,
  //             el.is_manager,
  //             el.tenure,
  //             el.state,
  //             el.pto
  //           ))}
  //         )
  // let finalArray = [];
  // mappedUsers.map(el => {
  //     console.log(el.firstName)
  //         return ( finalArray.push(
  //         createData(el.firstName,
  //         el.lastName,
  //         el.username,
  //         el.email,
  //         el.isManager,
  //         el.tenure,
  //         el.state,
  //         el.pto)))
  // })

  //     return (mappedUsers.push(
  //       createData(
  //         el.first_name,
  //         el.last_name,
  //         el.username,
  //         el.email,
  //         el.is_manager,
  //         el.tenure,
  //         el.state,
  //         el.pto
  //       ))
  //     )
  //   })

  // )})
  //     console.log(mappedUsers)
  // let finalArray = _.flatten(mappedUsers);
  //  console.log(finalArray)

  //  let finalMap=[];

  //   mappedUsers.map((el)=>{
  //     return finalMap.push(el)
  //  })
  //  console.log('finalMAP',finalMap)
  //  setRows(mappedUsers)

  // ))

  // return rows;
  // }

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

  function handleOpen() {
    setOpen(true);
    getAllEmployees();
  }
  async function addEmployee(employee) {}

  async function deleteEmployee(employee) {}

  async function editEmployee(employee) {}
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
    <Box sx={{ width: "100%" }}>
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
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.firstName}</TableCell>
                      <TableCell align="right">{row.lastName}</TableCell>
                      <TableCell align="right">{row.userName}</TableCell>
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

//   return (
//     <div>
//       <Button variant="contained" onClick={handleOpen}>
//         Update Staff
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">

//           </Typography>

//           <table >
//             <thead>
//               <tr>
//                 <th>First </th>
//                 <th>Last </th>
//                 <th>Username </th>
//                 <th>Email</th>
//                 <th>Manager Status</th>
//                 <th>Tenure (yrs)</th>
//                 <th>State</th>
//                 <th>PTO</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users?.map((el, index) => {
//                 console.log(el)
//                 return (
//                   <tr key={index}>
//                     {/* {index + 1} */}
//                     <td>{el.first_name}</td>
//                     <td>{el.last_name}</td>
//                     <td>{el.username}</td>
//                     <td>{el.email}</td>
//                     <td>{el.is_manager}</td>
//                     <td>{el.tenure}</td>
//                     <td>{el.state}</td>
//                     <td>{el.pto}</td>
//                     <td><button>Delete</button></td>
//                     <td>
//                       <form
//                         // onSubmit={(event) => {
//                         //   handleSubmit(event, el);
//                         // }}
//                       >
//                         <label>
//                           First Name:
//                           <input
//                             id="first_name"
//                             value={firstName}
//                             type="text"
//                             name="first_name"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                         Last Name:
//                           <input
//                             id="last_name"
//                             value={lastName}
//                             type="text"
//                             name="last_name"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                         Username:
//                           <input
//                             id="username"
//                             value={username}
//                             type="text"
//                             name="username"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                           Email:
//                           <input
//                             id="email"
//                             value={email}
//                             type="email"
//                             name="email"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                         Manager Status:
//                           <input
//                             id="is_manager"
//                             value={isManager}
//                             type="text"
//                             name="is_manager"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                         Tenure:
//                           <input
//                             id="tenure"
//                             value={tenure}
//                             type="text"
//                             name="tenure"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                           State:
//                           <input
//                             id="state"
//                             value={email}
//                             type="text"
//                             name="state"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <label>
//                         PTO:
//                           <input
//                             id="pto"
//                             value={pto}
//                             type="text"
//                             name="pto"
//                             onChange={handleInputChange}
//                           />
//                         </label>
//                         <button type="submit" value="Submit">
//                           Add Team Member
//                         </button>
//                       </form>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <Button onClick={handleClose}>Close</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
