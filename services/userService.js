import axios from "axios";

const loginUser = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const registerUser = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const currentUser = (payload) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getPeople = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev//api/friends/?pageIndex=0&pageSize=5",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

var userService = { currentUser, registerUser, loginUser, getPeople };

export default userService;
