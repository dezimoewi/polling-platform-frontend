import axios from "axios";

const API = "http://localhost:5000/api/auth"; // backend port

export const registerHost = async (data) => {
  return axios.post(`${API}/register`, data); // axios handles JSON
};

export const loginHost = async (data) => {
  return axios.post(`${API}/login`, data);
};
