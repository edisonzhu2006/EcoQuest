import React from 'react';
import './css/Navbar.css';
import { ReactComponent as CoinIcon } from '../assets/otherAssets/coin.svg';
import logo from '../assets/otherAssets/logo.png'; // PNG logo import

const Navbar = () => {
  const coins = 128; // Placeholder for future backend fetch

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="nav-link">Home</a>
        <a href="/shop" className="nav-link">Shop</a>
        <a href="/challenges" className="nav-link">Challenges</a>
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
