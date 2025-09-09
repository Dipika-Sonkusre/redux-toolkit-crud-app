import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser, fetchUsers } from "../redux/action/userAction";
import type { User } from "../lib/type";

export default function useUsers() {
  const dispatch = useAppDispatch();
  const { loading, error, users } = useAppSelector((state) => state.user);

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
  };
}
