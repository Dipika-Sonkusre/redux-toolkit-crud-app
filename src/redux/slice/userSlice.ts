import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../lib/type";
import { addUser, fetchUsers } from "../action/userAction";
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // It is mandatory to have reducers object, even if it's empty
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
    });

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.error = null;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add user";
    });

    // builder.addCase("users/update/pending", (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });

    // builder.addCase("users/update/fulfilled", (state, action) => {
    //   const index = state.users.findIndex(
    //     (user) => user.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.users[index] = action.payload;
    //   }
    // });

    // builder.addCase("users/update/rejected", (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to update user";
    // });

    // builder.addCase("users/delete/pending", (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });

    // builder.addCase("users/delete/fulfilled", (state, action) => {
    //   state.loading = false;
    //   state.users = state.users.filter((user) => user.id !== action.payload.id);
    //   state.error = null;
    // });

    // builder.addCase("users/delete/rejected", (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to delete user";
    // });
  },
});

export const userReducer = userSlice.reducer;
