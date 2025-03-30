import React, { useState, useEffect } from 'react';
import './css/Navbar.css';
import { ReactComponent as CoinIcon } from '../assets/otherAssets/coin.svg';
import logo from '../assets/otherAssets/logo.png';

const Navbar = () => {
  const [coins, setCoins] = useState(0);
  const [username, setUsername] = useState('');

  const userId = localStorage.getItem('userID');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await res.json();
        setCoins(data.coins || 0);
        setUsername(data.username || '');
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="nav-link">Home</a>
        <a href="/location" className="nav-link">Location</a>
      </div>

      <div className="nav-center">
        <img src={logo} alt="EcoQuest Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        <span className="coin-count">{coins}</span>
        <CoinIcon className="coin-icon" />
        <span className="nav-username">{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
