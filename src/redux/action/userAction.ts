import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAsyncThunk } from "../../api/service";
import type { User } from "../../lib/type";

const API_URL = "http://localhost:3000/users";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  return handleAsyncThunk(API_URL);
});

export const addUser = createAsyncThunk("users/add", async (user: User) => {
  return handleAsyncThunk(API_URL, "post", user);
});
export const updateUser = createAsyncThunk(
  "users/update",
  async (user: User) => {
    return handleAsyncThunk(`${API_URL}/${user.id}`, "put", user);
  }
);
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: number) => {
    return handleAsyncThunk(`${API_URL}/${id}`, "delete");
  }
);
