import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
});

export default axiosInstance;