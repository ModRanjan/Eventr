import axios from 'axios';
import jwtToken from './config';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { Authorization: jwtToken },
});

// instance.defaults.headers.common['Authorization'] = jwtToken;

export default instance;
