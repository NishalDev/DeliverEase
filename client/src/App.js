// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'; // Use Homepage.js
import GoodsDashboard from './pages/GoodsDashboard'; // Import GoodsDashboard
import TransporterDashboard from './pages/TransporterDashboard'; // Import TransporterDashboard
import Payment from './pages/PaymentPage'; // Import Payment page
import Navigation from './components/Navigation'; // Import Navigation
import ServicesPage from './pages/ServicesPage'; // Ensure this path is correct
import Dashboard from './pages/Dashboard'; // Import the Dashboard component
import PaymentPage from './pages/PaymentPage'; // Import your PaymentPage component
import ManageDashboard from './pages/ManageDashboard'; // Import your ManageDashboard component



const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Use element instead of component */}
        <Route path="/goods-dashboard" element={<GoodsDashboard />} />
        <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/services" element={<ServicesPage />} /> {/* Ensure this is included */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/manage" element={<ManageDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
