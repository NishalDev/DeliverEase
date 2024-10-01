// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'; // Use Homepage.js
import GoodsDashboard from './pages/GoodsDashboard'; // Import GoodsDashboard
import TransporterDashboard from './pages/TransporterDashboard'; // Import TransporterDashboard
import Payment from './pages/PaymentPage'; // Import Payment page
import Navigation from './components/Navigation'; // Import Navigation

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Use element instead of component */}
        <Route path="/goods-dashboard" element={<GoodsDashboard />} />
        <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
