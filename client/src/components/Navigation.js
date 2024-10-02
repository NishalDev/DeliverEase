import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => (
  <nav className="bg-blue-800 p-4 text-white flex justify-between">
    <div className="logo">
      <Link to="/">Deliverease</Link>
    </div>
    <ul className="flex space-x-4">
      <li><Link to="/goods-dashboard">Goods</Link></li>
      <li><Link to="/transporter-dashboard">Transporters</Link></li>
      <li><Link to="/payment">Payments</Link></li>
    </ul>
  </nav>
);

export default Navigation;
