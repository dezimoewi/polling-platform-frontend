import axios from "axios";

const API = "http://localhost:5000/api/sessions";

export const createSession = async (token, data) => {
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSessions = async (token) => {
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// Delete session
export const deleteSession = (token, sessionId) =>
  axios.delete(`${API_URL}/${sessionId}`, { headers: { Authorization: `Bearer ${token}` } });

