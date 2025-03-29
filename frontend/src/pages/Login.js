import React from 'react';
import './css/SignUp.css';

function Login() {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Login</h2>
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
        <div className="signin-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button className="signin-button">Log In</button>
        <p className="signup-text">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
