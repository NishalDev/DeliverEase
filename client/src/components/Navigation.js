import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/goods-dashboard">Goods Dashboard</Link></li>
        <li><Link to="/transporter-dashboard">Transporter Dashboard</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
