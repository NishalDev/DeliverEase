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
};

export default AuthService;
