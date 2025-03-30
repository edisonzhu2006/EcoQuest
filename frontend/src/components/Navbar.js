import React, { useState, useEffect } from 'react';
import './css/Navbar.css';
import { ReactComponent as CoinIcon } from '../assets/otherAssets/coin.svg';
import logo from '../assets/otherAssets/logo.png';



const Navbar = () => {
  const [coins, setCoins] = useState(0);

  const userId = localStorage.getItem('userID');
  // const userId = '67e87999bd6e624628c0a3c9'; // Replace with actual user ID



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await res.json();
        setCoins(data.coins || 0);
      } catch (err) {
        console.error("Failed to fetch user coins:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="nav-link">Home</a>
        {/* <a href="/shop" className="nav-link">Shop</a>
        <a href="/challenges" className="nav-link">Challenges</a> */}
      </div>

      <div className="nav-center">
        <img src={logo} alt="EcoQuest Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        <span className="coin-count">{coins}</span>
        <CoinIcon className="coin-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
