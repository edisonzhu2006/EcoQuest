import React from 'react';
import './css/SignUp.css';

function SignUp() {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
        <div className="signin-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button className="signin-button">Sign Up</button>
        <p className="signup-text">
          Have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
