import React, { useState, useEffect } from 'react';
import './css/Shop.css';
import { ReactComponent as CoinIcon } from '../assets/otherAssets/coin.svg';



const Shop = () => {
  const [items, setItems] = useState([]);
  const [userCoins, setUserCoins] = useState(0);

  const userId = localStorage.getItem('userID');
  // const userId = '67e87999bd6e624628c0a3c9'; // Set to actual user ID from DB



  
  const awsBaseUrl = "https://ecoquest-storageofimages-3292025-princeton.s3.us-east-2.amazonaws.com";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/items'); // local host
        const response = await fetch('https://ecoquest-n5ub.onrender.com/api/items'); // live 
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchUserCoins = async () => {
      try {
        // const res = await fetch(`http://localhost:3000/api/users/${userId}`); // local host
        const res = await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}`); // live
        const data = await res.json();
        setUserCoins(data.coins);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchItems();
    fetchUserCoins();
  }, [userId]);

  const handlePurchase = async (item) => {
    const confirmPurchase = window.confirm(`Are you sure you want to purchase: ${item.name} for ${item.cost || 0} coins?`);
    if (!confirmPurchase) return;

    if (userCoins < item.cost) {
      alert("You do not have enough coins to purchase this item.");
      return;
    }

    try {
      // Update inventory
      // await fetch(`http://localhost:3000/api/users/${userId}/inventory`, { // local host
      await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}/inventory`, { // live
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: item._id }),
      });

      // Subtract coins from wallet
      // await fetch(`http://localhost:3000/api/users/${userId}/wallet`, { // local host
      await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}/wallet`, { // live
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coins: -item.cost }),
      });

      alert(`Successfully purchased ${item.name}!`);
      setUserCoins(prev => prev - item.cost);
      window.location.reload();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again later.");
    }
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Flower Shop</h2>
      <hr className="divider" />
      <div className="shop-grid">
        {items.map((item, index) => (
          <div className="shop-item" key={item._id || index} onClick={() => handlePurchase(item)}>
            <img
              src={`${awsBaseUrl}${item.imageUrl}`}
              alt={item.name}
              className="shop-image"
            />
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