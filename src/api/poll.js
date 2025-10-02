// // src/api/poll.js
// import axios from "axios";

// const API_BASE = "http://localhost:5000/api/sessions";

// // Create a new poll for a session
// export const createPoll = async (sessionCode, token, { question, options, type }) => {
//   return axios.post(
//     `${API_BASE}/${sessionCode}/polls`,
//     { question, options, type },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };

// // Get all polls for a session
// export const getPolls = async (sessionCode, token) => {
//   return axios.get(`${API_BASE}/${sessionCode}/polls`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// // Update poll status (publish/close)
// export const updatePollStatus = async (pollId, token, status) => {
//   return axios.put(
//     `${API_BASE}/polls/${pollId}/status`,
//     { status },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };



// // Delete a poll
// export const deletePoll = async (pollId, token) => {
//   return axios.delete(`${API_BASE}/polls/${pollId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };



// // src/api/poll.js
// import axios from "axios";

// const API_BASE = "http://localhost:5000/api/sessions";

// // Create a new poll for a session
// export const createPoll = async (sessionCode, token, { question, options, type }) => {
//   return axios.post(
//     `${API_BASE}/${sessionCode}/polls`,
//     { question, options, type },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

// // Get all polls for a session
// export const getPolls = async (sessionCode, token) => {
//   return axios.get(`${API_BASE}/${sessionCode}/polls`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Update poll status (publish/close) ✅ FIXED
// export const updatePollStatus = async (sessionCode, pollId, token, status) => {
//   return axios.put(
//     `${API_BASE}/${sessionCode}/polls/${pollId}/status`,
//     { status },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

// // Delete a poll ✅ FIXED
// export const deletePoll = async (sessionCode, pollId, token) => {
//   return axios.delete(`${API_BASE}/${sessionCode}/polls/${pollId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // src/api/poll.js
// import axios from "axios";

// const API_BASE = "http://localhost:5000/api/sessions";

// // Create a new poll for a session
// export const createPoll = async (sessionCode, token, { question, options, type }) => {
//   return axios.post(
//     `${API_BASE}/${sessionCode}/polls`,
//     { question, options, type },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

// // Get all polls for a session
// export const getPolls = async (sessionCode, token) => {
//   return axios.get(`${API_BASE}/${sessionCode}/polls`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Update poll status (publish/close)
// export const updatePollStatus = async (pollId, token, status) => {
//   return axios.put(
//     `${API_BASE}/polls/${pollId}/status`,
//     { status },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

// // Delete a poll
// export const deletePoll = async (pollId, token) => {
//   return axios.delete(`${API_BASE}/polls/${pollId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };



// src/api/poll.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/sessions";

// Create a new poll for a session
export const createPoll = async (sessionCode, token, { question, options, type }) => {
  return axios.post(
    `${API_BASE}/${sessionCode}/polls`,
    { question, options, type },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Get all polls for a session
export const getPolls = async (sessionCode, token) => {
  return axios.get(`${API_BASE}/${sessionCode}/polls`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update poll status (publish/close)
export const updatePollStatus = async (sessionCode, pollId, token, status) => {
  return axios.put(
    `${API_BASE}/${sessionCode}/polls/${pollId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Delete a poll
export const deletePoll = async (sessionCode, pollId, token) => {
  return axios.delete(`${API_BASE}/${sessionCode}/polls/${pollId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
