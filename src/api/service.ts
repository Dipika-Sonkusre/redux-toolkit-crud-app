import axios from "axios";
import type { User } from "../lib/type";

export const handleAsyncThunk = async (
  url: string,
  method: "get" | "post" | "put" | "delete" = "get",
  data: User | "" = ""
) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    });
    console.log("🚀 ~ handleAsyncThunk ~ response:", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      console.log("An unexpected error occurred");
    }
    throw error;
  }
};
