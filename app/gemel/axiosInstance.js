import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://data.gov.il/api/3/action',
  timeout: 10000,
});

export default axiosInstance;
