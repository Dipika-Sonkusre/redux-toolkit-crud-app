import { useEffect, useMemo, useRef, useState } from "react";

import ViewUserDialog from "./ViewUserDialog";
import EditDialog from "./EditDialog";

import { setCurrentPage } from "../redux/slice/userSlice";
import { deleteUser, fetchUsers } from "../redux/action/userAction";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { usersColumns } from "../utils/constants";
import type { User } from "../lib/type";

import {
  Box,
  Container,
  debounce,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import classes from "../styles/Users.module.css";
import SkeletonLoader from "../commonComponents/SkeletonLoader";

import Search from "./Search";

export default function Users() {
  const dispatch = useAppDispatch();
  const { loading, error, users } = useAppSelector((state) => state.user);

  const [searchText, setSearchText] = useState("");
  const [editAndViewId, setEditAndViewId] = useState<string | null>(null);
  const [isEditModel, setIsEditModel] = useState(false);
  const [isViewModel, setIsViewModel] = useState(false);
  const [isMoreOptionOpenId, setIsMoreOptionOpenId] = useState<string | null>(
    null
  );
  const moreOptionRef = useRef<HTMLElement | null>(null); // Reference for the dropdown

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Set current page when data length or rowsPerPage changes
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(users.length / rowsPerPage) - 1);
    if (page > maxPage) {
      dispatch(setCurrentPage(maxPage));
    }
  }, [users.length, rowsPerPage, page, dispatch]);

  const handleMoreOptionButton = (id: string) => {
    setIsMoreOptionOpenId(isMoreOptionOpenId === id ? null : id);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        const filteredItems: User[] = users.filter((user: User) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filteredItems);
        dispatch(setCurrentPage(0));
      }, 500),
    [users]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query);
    debouncedSearch(query);
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setFilteredUsers(users);
    dispatch(setCurrentPage(0));
  };

  const handleSort = (column: string) => {
    if (column === null) return;

    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortColumn(column);
    setSortDirection(isAsc ? "desc" : "asc");
  };

  const sortedData = [...filteredUsers].sort((a, b) => {
    if (sortColumn === null) return 0;
    if (
      a[sortColumn as keyof User] === undefined ||
      b[sortColumn as keyof User] === undefined
    )
      return 0;

    const columnA = a[sortColumn as keyof User];
    const columnB = b[sortColumn as keyof User];

    if (typeof columnA === "string" && typeof columnB === "string") {
      return sortDirection === "asc"
        ? columnA.localeCompare(columnB)
        : columnB.localeCompare(columnA);
    } else if (typeof columnA === "number" && typeof columnB === "number") {
      return sortDirection === "asc" ? columnA - columnB : columnB - columnA;
    }
    return 0;
  });

  const paginatedUsers = useMemo(
    () =>
      sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "2rem",
      }}
    >
      <Search
        searchText={searchText}
        handleSearch={handleSearch}
        handleCancelSearch={handleCancelSearch}
      />

      {!loading && error && (
        <Box className={classes["error-container"]}>
          <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
          <p className={classes.error}>{error}</p>
        </Box>
      )}

      {!error && (
        <>
          <TableContainer
            style={{
              marginTop: "2rem",
            }}
          >
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
                    <TableCell
                      key={column.label}
                      sortDirection={
                        sortColumn === column.key ? sortDirection : false
                      }
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={sortColumn === column.key}
                          direction={
                            sortColumn === column.key ? sortDirection : "asc"
                          }
                          onClick={() => column.key && handleSort(column.key)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonLoader count={5} />
                ) : (
                  paginatedUsers.map((row, ind) => (
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
                  ))
                )}
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
