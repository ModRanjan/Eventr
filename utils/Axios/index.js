import axios from 'axios';

// fow now - get this from eventr-APIs backend
const jwtToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ3YWxsZXRBZGRyZXNzIjoiMHhiOGZmMkZGYzQwZmI4RDhmQ0NBMTI5QTNiOGQxMmEyNURBOGUwOTU3Iiwibm9uY2UiOiJkZmMzYTI2NzkyNjgwZTBlMTBhYzQzZjg4NWY1OWNjZGZhNmU2YzFiMTI4NGM4N2E4YWE4ZTk4MWQzYjUyMGIwIiwiZGVsZXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIyVDA5OjIxOjE0LjI5OFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTMwVDE1OjE4OjI0LjAyM1oiLCJpYXQiOjE2Njk4MjE2NzYsImV4cCI6MTY3MjQxMzY3Nn0.0Ni3cppIXSUIljMAmI5sV_jT9l7YtWy-H671kdkUuXQ';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  //   timeout: 1000,
  headers: { Authorization: jwtToken },
});

// instance.defaults.headers.common['Authorization'] = jwtToken;

// instance.interceptors.request...

export default instance;
