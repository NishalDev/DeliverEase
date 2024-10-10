// src/components/TransportersList.js
import React from 'react';
import './TransportersList.css'; // Your existing styles
import Button from '../css/Button.css'; // Import the Button component

const transportersData = [
  { id: 1, name: 'Transporter A', description: 'Transporter A Description' },
  { id: 2, name: 'Transporter B', description: 'Transporter B Description' },
  { id: 3, name: 'Transporter C', description: 'Transporter C Description' },
];

const TransportersList = () => {
  const handleButtonClick = (transporterName) => {
    alert(`You clicked on ${transporterName}`);
  };

  return (
    <div className="transporters-container">
      {transportersData.map((transporter) => (
        <div className="card" key={transporter.id}>
          <h3>{transporter.name}</h3>
          <p>{transporter.description}</p>
          <Button text="View Details" onClick={() => handleButtonClick(transporter.name)} />
        </div>
      ))}
    </div>
  );
};

export default TransportersList;
