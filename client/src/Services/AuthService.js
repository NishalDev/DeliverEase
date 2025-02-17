import axios from "axios";

const API_URL = "http://localhost:5002/api/auth/";

const AuthService = {
  register: (username, email, password) => {
    return axios.post(`${API_URL}register`, { username, email, password });
  },

  login: (email, password) => {
    return axios.post(`${API_URL}login`, { email, password });
  },

  switchRole: (role) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(`${API_URL}switch-role`, { role }, config);
  },

  logout: () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Optionally, you can also invalidate the session on the backend (optional step)
    // If you want to make sure the token is invalidated on the server-side, you can send a request like:
    // return axios.post(`${API_URL}logout`, {}, { headers: { Authorization: `Bearer ${token}` } });

    // Redirect user to login or home page
    window.location.href = "/login"; // Adjust the redirect path as needed
  },
};

export default AuthService;
