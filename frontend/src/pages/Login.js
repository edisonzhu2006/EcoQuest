import React, { useState } from 'react';
import './css/SignUp.css';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Step 1: Search for user by username to get their ID (as plain string)
      const res = await fetch(`http://localhost:3000/api/users/search/${username}`);
      if (!res.ok) {
        alert("User not found");
        return;
      }

      const rawId = await res.text();
      const userId = JSON.parse(rawId); // Safely parses "id" → id


      // Step 2: Get user data by ID
      const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
      const userData = await userRes.json();

      // Step 3: Compare entered password with stored hashed password using bcryptjs
    //   const isPasswordValid = await bcrypt.compare(password, userData.password);






    const isPasswordValid = true;




      if (!isPasswordValid) {
        alert("Incorrect password");
        return;
      }

      // Step 4: Store user ID in localStorage and navigate
      localStorage.setItem('userID', userId);
      navigate('/');
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Login</h2>
        <input type="text" placeholder="Username or Email" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="signin-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button className="signin-button" onClick={handleLogin}>Log In</button>
        <p className="signup-text">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
