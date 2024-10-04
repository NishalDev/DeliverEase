import React, { useState } from 'react';
import './TransporterDashboard.css'; // Import the CSS file
import BackButton from '../components/BackButton';

const initialTransporters = [
  { id: 1, name: 'ABC Logistics', contact: '123-456-7890', location: 'New York', capacity: '10 tons', rating: 4.5 },
  { id: 2, name: 'XYZ Transport', contact: '987-654-3210', location: 'Los Angeles', capacity: '15 tons', rating: 4.7 },
  { id: 3, name: 'Quick Delivery Co.', contact: '456-123-7890', location: 'Chicago', capacity: '20 tons', rating: 4.8 },
];

const TransporterDashboard = () => {
  const [transporters, setTransporters] = useState(initialTransporters);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTransporter, setNewTransporter] = useState({ name: '', contact: '', location: '', capacity: '', rating: '' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransporter({ ...newTransporter, [name]: value });
  };

  const handleAddTransporter = (e) => {
    e.preventDefault();
    if (newTransporter.name && newTransporter.contact && newTransporter.location && newTransporter.capacity && newTransporter.rating) {
      setTransporters([...transporters, { id: transporters.length + 1, ...newTransporter }]);
      setNewTransporter({ name: '', contact: '', location: '', capacity: '', rating: '' }); // Reset input fields
    }
  };

  return (
    <div className="transporter-dashboard">
      <BackButton /> {/* Add the Back Button here */}
      <h1>Transporter Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Transporters..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="transporter-list">
        <h2>Available Transporters</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {transporters
              .filter(transporter => transporter.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(transporter => (
                <tr key={transporter.id}>
                  <td>{transporter.name}</td>
                  <td>{transporter.contact}</td>
                  <td>{transporter.location}</td>
                  <td>{transporter.capacity}</td>
                  <td>{transporter.rating}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="add-transporter-form">
        <h2>Add New Transporter</h2>
        <form onSubmit={handleAddTransporter}>
          <input
            type="text"
            name="name"
            placeholder="Transporter Name"
            value={newTransporter.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={newTransporter.contact}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newTransporter.location}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="capacity"
            placeholder="Capacity"
            value={newTransporter.capacity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={newTransporter.rating}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Transporter</button>
        </form>
      </div>
    </div>
  );
};

export default TransporterDashboard;
