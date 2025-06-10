import axios from 'axios';

// Create an axios instance using a CORS proxy
const axiosInstance = axios.create({
  baseURL: 'https://api.allorigins.win/raw?url=', // CORS proxy
});

export default axiosInstance;