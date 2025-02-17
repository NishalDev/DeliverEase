// src/components/Goods.js
import React from 'react';
import '../css/Goods.css'; // Your existing styles
import Button from './Button'; // Import the Button component

const goodsData = [
  { id: 1, name: 'Item 1', description: 'Description of Item 1' },
  { id: 2, name: 'Item 2', description: 'Description of Item 2' },
  { id: 3, name: 'Item 3', description: 'Description of Item 3' },
];

const Goods = () => {
  const handleButtonClick = (itemName) => {
    alert(`You clicked on ${itemName}`);
  };

  return (
    <div className="goods-container">
      {goodsData.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <Button text="View Details" onClick={() => handleButtonClick(item.name)} className="custom-button blue-button" />
          <Button text="Add to Cart" onClick={() => handleButtonClick(item.name)} className="custom-button red-button" />
        </div>
      ))}
    </div>
  );
};

export default Goods;
