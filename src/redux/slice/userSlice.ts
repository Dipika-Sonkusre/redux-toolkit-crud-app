import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  fetchUsers,
  getUser,
  updateUser,
} from "../action/userAction";
import { showToast } from "../../utils/toastHandler";
import type { User, UserState } from "../../lib/type";

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 5,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
  }, // It is mandatory to have reducers object, even if it's empty
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
      showToast(action.error.message || "Failed to fetch users", "error");
    });

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user";
      showToast(action.error.message || "Failed to fetch user", "error");
    });

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      showToast("User added successfully!", "success");
      state.error = null;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add user";
      showToast(action.error.message || "Failed to add user", "error");
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      showToast("User updated successfully!", "success");
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update user";
      showToast(action.error.message || "Failed to update user", "error");
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter(
        (user: User) => user.id !== action.payload
      );
      state.error = null;
      showToast("User deleted successfully!", "success");
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete user";
      showToast(action.error.message || "Failed to delete user", "error");
    });
  },
});
export const { setCurrentPage, setRowsPerPage } = userSlice.actions;
export const userReducer = userSlice.reducer;
