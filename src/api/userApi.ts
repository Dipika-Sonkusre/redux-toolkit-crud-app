import axios, { type AxiosRequestConfig } from "axios";
import type { User } from "../lib/type";
import { showToast } from "../utils/toastHandler";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface ApiRequestOptions {
  url: string;
  method?: HttpMethod;
  data?: User | "";
  headers?: Record<string, string>;
}
export const apiRequestHandler = async ({
  url,
  method = "get",
  data = "",
  headers = {},
}: ApiRequestOptions) => {
  console.log(url,"url");
  
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
    };

    if (method !== "get" && data !== undefined && data !== "") {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Network error: no response received
      if (!error.response) {
        const message =
          "Unable to connect. Please check your internet connection and try again.";
        showToast(message, "error");
        throw message;
      }

      // Server responded with an error status
      const status = error.response.status;
      const serverMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Server error occurred.";

      // Optional: You can customize messages based on status codes
      if (status >= 500) {
        const message = "Server is currently unavailable. Please try later.";
        showToast(message, "error");
        throw message;
      } else if (status === 401) {
        const message = "Unauthorized. Please log in again.";
        showToast(message, "error");
        throw message;
      } else if (status === 403) {
        const message = "Forbidden. You do not have permission.";
        showToast(message, "error");
        throw message;
      } else if (status === 404) {
        const message = "Requested resource not found.";
        showToast(message, "error");
        throw message;
      } else if (status >= 400) {
        showToast(serverMessage, "error");
        throw new Error(serverMessage);
      }

      // Fallback
      const fMessage = "An error occurred while processing your request.";
      showToast(fMessage, "error");
      throw fMessage;
    } else {
      // Non-Axios error
      const message = "An error occurred while processing your request.";
      showToast(message, "error");
      throw new Error(message);
    }
  }
};
