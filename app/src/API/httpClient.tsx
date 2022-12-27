import axios from "axios";

const baseUrl: string = process.env.REACT_APP_BACKEND_PATH!;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
