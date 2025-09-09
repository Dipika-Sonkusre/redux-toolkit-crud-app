import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditDialog from "./EditDialog";
import ErrorIcon from "@mui/icons-material/Error";
import classes from "../styles/Users.module.css";
import ViewUserDialog from "./ViewUserDialog";
import useUsers from "../hooks/useUsers";
import { usersColumns } from "../utils/constants";
import CustomButton from "../commonComponents/CustomButton";

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
  } = useUsers();

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "3rem",
      }}
    >
      {loading && (
        <Box sx={{ textAlign: "center", fontSize: "1.2rem" }}>Loading...</Box>
      )}

      {!loading && error && (
        <Box className={classes["error-container"]}>
          <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
          <p className={classes.error}>{error}</p>
        </Box>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table
            className={classes["table-container"]}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "var(--color-primary)",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "white",
                  },
                }}
              >
                {usersColumns.map((column) => (
                  <TableCell align={column !== "ID" ? "right" : "left"}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, ind) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ind + 1}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    <Box className={classes["action-buttons"]}>
                      <CustomButton
                        onClick={() => handleViewUserModel(row.id)}
                        className={classes["view-button"]}
                      >
                        View
                      </CustomButton>
                      <CustomButton
                        onClick={() => handleEditModel(row)}
                        className={classes["edit-button"]}
                      >
                        Edit
                      </CustomButton>
                      <CustomButton
                        onClick={() => handleUserDelete(row.id)}
                        className={classes["delete-button"]}
                      >
                        Delete
                      </CustomButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
