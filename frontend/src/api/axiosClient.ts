import axios from "axios";
import { toast } from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: "http://localhost:5138",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred.";
    toast.error(message);
    return Promise.reject(error);
  },
);

export default axiosClient;
