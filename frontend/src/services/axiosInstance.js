import axios from "axios";

const token = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export default axiosInstance;
