import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forget.css';
import BackgroundImage from '../img/Login.png';
import CenterImage from '../img/login-img.png';

const Forgetpass = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/password-reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Password reset link sent to your email!');
      } else {
        alert(`Error: ${data.message || 'Invalid email address'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgetpass-form-container">
        <h2 className="forgetpass">Forgot Password?</h2>
        <p className="forgetpass-text">
          Don’t worry! It happens. Please enter the <br />
          email associated with your account.
        </p>

        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field" // Updated class name
          />
          <button type="submit" className="submit-button">Send Reset Link</button> {/* Updated class name */}
        </form>

        <p className="forgetpass-back-to-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>

      <div 
        className="forgetpass-image-container" 
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <p className="forgetpass-welcome-text">Welcome to</p>
        <p className="forgetpass-nitro-tech-text">Nitro Tech</p>
        <img src={CenterImage} alt="Centered Logo" className="forgetpass-center-img" />
      </div>
    </div>
  );
};

export default Forgetpass;
