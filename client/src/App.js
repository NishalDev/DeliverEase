// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'; // Homepage component
import GoodsDashboard from './pages/GoodsDashboard'; // GoodsDashboard component
import TransporterDashboard from './pages/TransporterDashboard'; // TransporterDashboard component
import PaymentPage from './pages/PaymentPage'; // PaymentPage component
import Navigation from './components/Navigation'; // Navigation component
import ServicesPage from './pages/ServicesPage'; // ServicesPage component
import Dashboard from './pages/Dashboard'; // Dashboard component
import ManageDashboard from './pages/ManageDashboard'; // ManageDashboard component
import RegisterPage from './pages/RegisterPage.js'; // RegisterPage component
import LoginPage from './pages/LoginPage.js'; // LoginPage component

const App = () => {
  return (
    <Router>
      <Navigation /> {/* Navigation bar should be consistent across all routes */}
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Homepage route */}
        <Route path="/register" element={<RegisterPage />} /> {/* Register route */}
        <Route path="/login" element={<LoginPage />} /> {/* Login route */}
        <Route path="/goods-dashboard" element={<GoodsDashboard />} /> {/* Goods owner dashboard */}
        <Route path="/transporter-dashboard" element={<TransporterDashboard />} /> {/* Transporter dashboard */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Payment page */}
        <Route path="/services" element={<ServicesPage />} /> {/* Services page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* General dashboard */}
        <Route path="/manage" element={<ManageDashboard />} /> {/* Manage dashboard */}
      </Routes>
    </Router>
  );
};

export default App;
