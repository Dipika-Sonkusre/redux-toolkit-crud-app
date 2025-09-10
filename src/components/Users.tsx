import ViewUserDialog from "./ViewUserDialog";
import EditDialog from "./EditDialog";
import useUsers from "../hooks/useUsers";

import { usersColumns } from "../utils/constants";
import {
  Box,
  Container,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";

import classes from "../styles/Users.module.css";

export default function Users() {
  const {
    isEditModel,
    editAndViewId,
    isViewModel,
    handleClose,
    onCloseViewModel,
    users,
    loading,
    error,
    handleViewUserModel,
    handleEditModel,
    handleUserDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedUsers,
    page,
    rowsPerPage,
    handleMoreOptionButton,
    isMoreOptionOpenId,
    moreOptionRef,
  } = useUsers();

  const renderSkeletonRows = (count: number) => {
    return Array.from(new Array(count)).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "4rem",
      }}
    >
      {!loading && error && (
        <Box className={classes["error-container"]}>
          <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
          <p className={classes.error}>{error}</p>
        </Box>
      )}

      {!error && (
        <>
          <TableContainer>
            <Table
              className={classes["table-container"]}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                  }}
                >
                  {usersColumns.map((column) => (
                    <TableCell align={column !== "ID" ? "left" : "left"}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? renderSkeletonRows(5)
                  : paginatedUsers.map((row, ind) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {page * rowsPerPage + ind + 1}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              position: "relative",
                            }}
                          >
                            <IconButton
                              onClick={() => handleMoreOptionButton(row.id)}
                            >
                              <MoreHorizIcon />
                            </IconButton>

                            {isMoreOptionOpenId === row.id && (
                              <Box
                                className={classes["action-buttons"]}
                                ref={moreOptionRef}
                              >
                                <Typography
                                  onClick={() => handleViewUserModel(row.id)}
                                  className={classes.links}
                                >
                                  <VisibilityIcon
                                    sx={{
                                      fontSize: "20px",
                                    }}
                                  />
                                  View
                                </Typography>
                                <Typography
                                  onClick={() => handleEditModel(row)}
                                  className={classes.links}
                                >
                                  <EditIcon
                                    sx={{
                                      fontSize: "20px",
                                    }}
                                  />
                                  Edit
                                </Typography>
                                <Typography
                                  onClick={() => handleUserDelete(row.id)}
                                  className={classes.links}
                                >
                                  <DeleteIcon
                                    sx={{
                                      fontSize: "20px",
                                    }}
                                  />
                                  Delete
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={users.length}
            rowsPerPageOptions={[5, 10, 15, 30]}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <EditDialog
        open={isEditModel}
        handleClose={handleClose}
        id={editAndViewId || ""}
      />

      <ViewUserDialog
        open={isViewModel}
        handleClose={onCloseViewModel}
        id={editAndViewId || ""}
      />
    </Container>
  );
}
