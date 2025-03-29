import React, { useState, useEffect } from 'react';
import "./css/Shop.css";
import { ReactComponent as CoinIcon } from '../assets/otherAssets/coin.svg';

const Shop = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    const fetchItems = async () => {
      // In the future, replace this with actual API call
      const fetchedItems = [
        { name: "Tree", price: 20, image: "https://via.placeholder.com/80x80?text=Tree" },
        { name: "Plant", price: 14, image: "https://via.placeholder.com/80x80?text=Plant" },
        { name: "Shrub", price: 10, image: "https://via.placeholder.com/80x80?text=Shrub" },
        { name: "Shrub", price: 10, image: "https://via.placeholder.com/80x80?text=Shrub" },
        { name: "Shrub", price: 10, image: "https://via.placeholder.com/80x80?text=Shrub" },
        { name: "Shrub", price: 10, image: "https://via.placeholder.com/80x80?text=Shrub" },
        { name: "Shrub", price: 10, image: "https://via.placeholder.com/80x80?text=Shrub" },


      ];
      setItems(fetchedItems);
    };

    fetchItems();
  }, []);

  const handlePurchase = (item) => {
    const confirmPurchase = window.confirm(`Are you sure you want to purchase: ${item.name} for ${item.price} coins?`);
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
          <div className="shop-item" key={index} onClick={() => handlePurchase(item)}>
            <img src={item.image} alt={item.name} className="shop-image" />
            <div className="item-name">{item.name}</div>
            <hr className="item-divider" />
            <div className="price-row">
              <span>{item.price}</span>
              <CoinIcon className="coin-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
