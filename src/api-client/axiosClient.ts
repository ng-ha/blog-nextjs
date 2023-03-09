import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err)
);
export default axiosClient;
