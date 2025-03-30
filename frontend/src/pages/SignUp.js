import React, { useState } from 'react';
import './css/SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // const response = await fetch('http://localhost:3000/api/users/signup', { // local host
      const response = await fetch('https://ecoquest-n5ub.onrender.com/api/users/signup', { // live
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Signup failed: " + error.error);
        return;
      }

      const data = await response.json();
      alert('Signup successful! You can now log in.');
      navigate('/');
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="signin-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button className="signin-button" onClick={handleSignUp}>Sign Up</button>
        <p className="signup-text">
          Have an account? <a onClick={() => navigate('/')}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;