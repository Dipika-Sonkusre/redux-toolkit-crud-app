import { useEffect, useMemo, useRef, useState } from "react";

import ViewUserDialog from "./ViewUserDialog";
import EditDialog from "./EditDialog";

import { setCurrentPage, setRowsPerPage } from "../redux/slice/userSlice";
import { deleteUser, fetchUsers } from "../redux/action/userAction";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { usersColumns } from "../utils/constants";
import type { User } from "../lib/type";

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
  const dispatch = useAppDispatch();
  const { loading, error, users, page, rowsPerPage } = useAppSelector(
    (state) => state.user
  );

  const [editAndViewId, setEditAndViewId] = useState<string | null>(null);
  const [isEditModel, setIsEditModel] = useState(false);
  const [isViewModel, setIsViewModel] = useState(false);
  const [isMoreOptionOpenId, setIsMoreOptionOpenId] = useState<string | null>(
    null
  );
  const moreOptionRef = useRef<HTMLElement | null>(null); // Reference for the dropdown

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreOptionRef.current &&
        !moreOptionRef.current.contains(event.target as Node)
      ) {
        setIsMoreOptionOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const refetch = () => {
    dispatch(fetchUsers());
  };

  const handleClose = () => {
    setIsEditModel(false);
    setEditAndViewId(null);
  };

  const onCloseViewModel = () => {
    setIsViewModel(false);
    setEditAndViewId(null);
  };

  const handleViewUserModel = (id: string) => {
    setIsMoreOptionOpenId(null);
    setIsViewModel(true);
    setEditAndViewId(id);
  };

  const handleUserDelete = async (id: string) => {
    setIsMoreOptionOpenId(null);
    if (id) {
      await dispatch(deleteUser(id));
      refetch();
    }
  };

  const handleEditModel = (row: User) => {
    setIsMoreOptionOpenId(null);
    setIsEditModel(true);
    setEditAndViewId(row.id);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setCurrentPage(0));
  };

  const paginatedUsers = useMemo(
    () => users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [users, page, rowsPerPage]
  );

  // Clamp current page when data length or rowsPerPage changes
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(users.length / rowsPerPage) - 1);
    if (page > maxPage) {
      dispatch(setCurrentPage(maxPage));
    }
  }, [users.length, rowsPerPage, page, dispatch]);

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

  const handleMoreOptionButton = (id: string) => {
    setIsMoreOptionOpenId(isMoreOptionOpenId === id ? null : id);
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
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? renderSkeletonRows(5)
                  : paginatedUsers.map((row, ind) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
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
            rowsPerPageOptions={[5, 10, 15, 25, 30]}
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
