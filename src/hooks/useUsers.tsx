import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      dispatch(setCurrentPage(newPage));
    },
    [dispatch]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    },
    [dispatch]
  );

  const paginatedUsers = useMemo(
    () => users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [users, page, rowsPerPage]
  );

  // set current page when data length or rowsPerPage changes
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(users.length / rowsPerPage) - 1);
    if (page > maxPage) {
      dispatch(setCurrentPage(maxPage));
    }
  }, [users.length, rowsPerPage, page, dispatch]);

  const handleMoreOptionButton = (id: string) => {
    setIsMoreOptionOpenId(isMoreOptionOpenId === id ? null : id);
  };

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
    handleMoreOptionButton,
    isMoreOptionOpenId,
    moreOptionRef,
  };
}
