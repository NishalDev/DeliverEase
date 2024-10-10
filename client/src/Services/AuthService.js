import axios from "axios";

const API_URL = "http://localhost:5002/api/auth/";

// Create an object to hold your service methods
const AuthService = {
  register: (username, email, password) => {
    return axios.post(`${API_URL}register`, { username, email, password });
  },

  login: (email, password) => {
    return axios.post(`${API_URL}login`, { email, password });
  },

  // New method to switch user role
  switchRole: (role) => {
    const token = JSON.parse(localStorage.getItem("user")).token; // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };
    return axios.put(`${API_URL}switch-role`, { role }, config); // Make PUT request to switch role
  },
};

// Export the AuthService object as default
export default AuthService;
