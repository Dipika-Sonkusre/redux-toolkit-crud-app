import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser, fetchUsers } from "../redux/action/userAction";
import type { User } from "../lib/type";
import { setCurrentPage, setRowsPerPage } from "../redux/slice/userSlice";

export default function useUsers() {
  const dispatch = useAppDispatch();
  const { loading, error, users, page, rowsPerPage } = useAppSelector(
    (state) => state.user
  );

  const [editAndViewId, setEditAndViewId] = useState<string | null>(null);
  const [isEditModel, setIsEditModel] = useState(false);
  const [isViewModel, setIsViewModel] = useState(false);

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
    setIsViewModel(true);
    setEditAndViewId(id);
  };

  const handleUserDelete = async (id: string) => {
    if (id) {
      await dispatch(deleteUser(id));
      refetch();
    }
  };

  const handleEditModel = (row: User) => {
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

  return {
    isEditModel,
    setIsEditModel,
    editAndViewId,
    setEditAndViewId,
    isViewModel,
    setIsViewModel,
    handleClose,
    onCloseViewModel,
    refetch,
    loading,
    error,
    users,
    handleViewUserModel,
    handleUserDelete,
    handleEditModel,
    paginatedUsers,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  };
}
