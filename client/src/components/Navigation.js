import React from 'react';
import '../css/Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">DeliverEase</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/">Contact</Link></li>
        <li><Link to="/">Subscriptions</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
