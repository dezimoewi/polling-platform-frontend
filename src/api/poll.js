// src/api/poll.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/sessions";

// Create a new poll for a session
export const createPoll = async (sessionCode, token, { question, options, type }) => {
  return axios.post(
    `${API_BASE}/${sessionCode}/polls`,
    { question, options, type },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get all polls for a session
export const getPolls = async (sessionCode, token) => {
  return axios.get(`${API_BASE}/${sessionCode}/polls`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update poll status (publish/close)
export const updatePollStatus = async (pollId, token, status) => {
  return axios.put(
    `${API_BASE}/polls/${pollId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
