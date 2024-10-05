import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth/';

// Create an object to hold your service methods
const AuthService = {
  register: (username, email, password, role) => {
    return axios.post(`${API_URL}register`, { username, email, password, role });
  },

  login: (email, password) => {
    return axios.post(`${API_URL}login`, { email, password });
  }
};

// Export the AuthService object as default
export default AuthService;
