import React, { useState } from 'react';
import './GoodsDashboard.css'; // Import the CSS file
import BackButton from '../components/BackButton';

const initialGoods = [
  { id: 1, name: 'Laptop', quantity: 10, price: 1200, description: 'High performance laptop' },
  { id: 2, name: 'Smartphone', quantity: 25, price: 800, description: 'Latest model smartphone' },
  { id: 3, name: 'Headphones', quantity: 15, price: 150, description: 'Noise-canceling headphones' },
];

const GoodsDashboard = () => {
  const [goods, setGoods] = useState(initialGoods);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGood, setNewGood] = useState({ name: '', quantity: 0, price: 0, description: '' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGood({ ...newGood, [name]: value });
  };

  const handleAddGood = (e) => {
    e.preventDefault();
    if (newGood.name && newGood.quantity > 0 && newGood.price > 0) {
      setGoods([...goods, { id: goods.length + 1, ...newGood }]);
      setNewGood({ name: '', quantity: 0, price: 0, description: '' }); // Reset input fields
    }
  };

  return (
    <div className="goods-dashboard">
      <BackButton /> {/* Add the Back Button here */}
      <h1>Goods Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Goods..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="goods-list">
        <h2>Available Goods</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {goods
              .filter(good => good.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(good => (
                <tr key={good.id}>
                  <td>{good.name}</td>
                  <td>{good.quantity}</td>
                  <td>${good.price}</td>
                  <td>{good.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="add-good-form">
        <h2>Add New Good</h2>
        <form onSubmit={handleAddGood}>
          <input
            type="text"
            name="name"
            placeholder="Good Name"
            value={newGood.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newGood.quantity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newGood.price}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newGood.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Add Good</button>
        </form>
      </div>
    </div>
  );
};

export default GoodsDashboard;
