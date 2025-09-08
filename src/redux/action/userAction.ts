import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequestHandler } from "../../api/userApi";
import type { User } from "../../lib/type";

const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
  return apiRequestHandler({
    url: API_URL,
  });
});

export const getUser = createAsyncThunk<User, string>(
  "users/get",
  async (id: string) => {
    return apiRequestHandler({
      url: `${API_URL}/${id}`,
    });
  }
);

export const addUser = createAsyncThunk("users/add", async (user: User) => {
  return apiRequestHandler({
    url: API_URL,
    method: "post",
    data: user,
  });
});
export const updateUser = createAsyncThunk(
  "users/update",
  async (user: User) => {
    return apiRequestHandler({
      url: `${API_URL}/${user.id}`,
      method: "put",
      data: user,
    });
  }
);
export const deleteUser = createAsyncThunk<string, string>(
  "users/delete",
  async (id: string) => {
    return apiRequestHandler({
      url: `${API_URL}/${id}`,
      method: "delete",
    });
  }
);
