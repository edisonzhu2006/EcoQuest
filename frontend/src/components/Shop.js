import React, { useState, useEffect } from 'react';
import './css/Shop.css';
import { ReactComponent as CoinIcon } from '../assets/otherAssets/coin.svg';

const Shop = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items'); // Updated base URL to match frontend
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handlePurchase = (item) => {
    const confirmPurchase = window.confirm(`Are you sure you want to purchase: ${item.name} for ${item.cost || 0} coins?`);
    if (confirmPurchase) {
      console.log(`Purchased: ${item.name}`);
      // purchase(item); // to be implemented
    }
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Flower Shop</h2>
      <hr className="divider" />
      <div className="shop-grid">
        {items.map((item, index) => (
          <div className="shop-item" key={item._id || index} onClick={() => handlePurchase(item)}>
            <img src={item.imageUrl} alt={item.name} className="shop-image" />
            <div className="item-name">{item.name}</div>
            <hr className="item-divider" />
            <div className="price-row">
              <span>{item.cost || 0}</span>
              <CoinIcon className="coin-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
