import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser, fetchUsers } from "../redux/action/userAction";
import {
  Box,
  Button,
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
import type { User } from "../lib/type";
import ErrorIcon from "@mui/icons-material/Error";
import classes from "../styles/Users.module.css";
import ViewUserDialog from "./ViewUserDialog";

export default function Users() {
  const { loading, error, users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isEditModel, setIsEditModel] = useState(false);
  const [editAndViewId, setEditAndViewId] = useState<string | null>(null);

  const [isViewModel, setIsViewModel] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserDelete = (id: string) => {
    if (id) {
      dispatch(deleteUser(id));
    }
  };

  const handleEditModel = (row: User) => {
    setIsEditModel(true);
    setEditAndViewId(row.id);
  };

  const handleClose = () => {
    setIsEditModel(false);
    setEditAndViewId(null);
  };

  const handleViewUserModle = (id: string) => {
    setIsViewModel(true);
    console.log("View user id:", id);
    setEditAndViewId(id);
  };

  const onCloseViewModel = () => {
    setIsViewModel(false);
    setEditAndViewId(null);
  };

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
          <ErrorIcon sx={{ color: "red" }} />
          <p className={classes.error}>{error}</p>
        </Box>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, width: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "var(--bgcolor)",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "white",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">EMAIL</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => handleViewUserModle(row.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditModel(row)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleUserDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </div>
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
