import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import _ from "lodash";
import LocationContext from "../contexts/locations";

const columns = [
  { id: "location", label: "Location Name", minWidth: 170 },
  { id: "address1", label: "Address", minWidth: 100 },
  {
    id: "phone",
    label: "Phone No.",
    minWidth: 170,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
    width: '80%',
    margin: 'auto',
    backgroundColor: '#0000000a',
  },
  table_row: {
    backgroundColor: 'white', 
  },
  table: {
    borderSpacing: '0 10px',
    padding: '10px',
  }
});
const onEditClick = (row, history) => {
  history.push(`/location/${row.id}`);
};

const onDeleteClick = (row, deleteRecord, setLocations, locations) => {
  deleteRecord(row.id).then(() => {
    alert("Record Deleted");
    setLocations(_.filter(locations, (item) => item.id !== row.id));
  });
};

export default function StickyHeadTable({ rows }) {
  const classes = useStyles();
  const { locations, setLocations } = useContext(LocationContext);
  const { deleteRecord } = useIndexedDB("locations");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const history = useHistory();
  console.log("history ", history);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow className={classes.table_row}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ backgroundColor: 'white' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log("Row details", row);
                return (
                  <TableRow className={classes.table_row} hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <EditIcon
                        onClick={() => onEditClick(row, history)}
                        style={{ cursor: "pointer" }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          onDeleteClick(
                            row,
                            deleteRecord,
                            setLocations,
                            locations
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
