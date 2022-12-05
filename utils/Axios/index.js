import axios from 'axios';

// fow now - get this from eventr-APIs backend
// userId: 106
// const jwtToken =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA2LCJuYW1lIjpudWxsLCJ1c2VyTmFtZSI6bnVsbCwiZW1haWwiOm51bGwsIndhbGxldEFkZHJlc3MiOiIweDMwQTdCZTU3N0EyMTgyYkY3NjkwZkQ3RDg0Y2U4ODMzRUVGOGQwN0EiLCJub25jZSI6IjZhZWQwMzM0MDExNmYzY2RiOTkzOTIzNGVjYjA1NDFhM2RhNjE2MWYyZTU3YTMzNzIzN2M1OGFlY2UyM2VhOGIiLCJkZWxldGVkQXQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMTItMDFUMTA6MDc6MjEuNzE1WiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMDJUMDg6NDE6NDcuNDkzWiIsImlhdCI6MTY2OTk3MDkxNiwiZXhwIjoxNjcyNTYyOTE2fQ.j9amqqGzbY2INGNcbYcUo4h0GXMAhmjRyzR9aH8gO7k';

// userId:1,
const jwtToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ3YWxsZXRBZGRyZXNzIjoiMHhiOGZmMkZGYzQwZmI4RDhmQ0NBMTI5QTNiOGQxMmEyNURBOGUwOTU3Iiwibm9uY2UiOiJkZmMzYTI2NzkyNjgwZTBlMTBhYzQzZjg4NWY1OWNjZGZhNmU2YzFiMTI4NGM4N2E4YWE4ZTk4MWQzYjUyMGIwIiwiZGVsZXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIyVDA5OjIxOjE0LjI5OFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTMwVDE1OjE4OjI0LjAyM1oiLCJpYXQiOjE2Njk4MjE2NzYsImV4cCI6MTY3MjQxMzY3Nn0.0Ni3cppIXSUIljMAmI5sV_jT9l7YtWy-H671kdkUuXQ`;

// userId: 109 ,
// const jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA5LCJ3YWxsZXRBZGRyZXNzIjoiMHg1NmI4MzQ3RjA1M0Y3RWZDOWI5MDE1Mzk5ZmQzNmE2MDRmOTIxMzVBIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0wMlQxMzowNTo1NS41MDZaIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0wMlQxMzowNTo1NS41MDZaIiwibmFtZSI6bnVsbCwidXNlck5hbWUiOm51bGwsImVtYWlsIjpudWxsLCJub25jZSI6bnVsbCwiZGVsZXRlZEF0IjpudWxsLCJpYXQiOjE2Njk5ODYzNTUsImV4cCI6MTY3MjU3ODM1NX0.bOzg2YY8Cj9nmXaIhtKNHYjqCPCL9Thvk5B4mItmnd4`

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { Authorization: jwtToken },
});

// instance.defaults.headers.common['Authorization'] = jwtToken;

export default instance;