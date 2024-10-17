import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forget.css'; // Ensure the CSS path is correct
import BackgroundImage from '../img/Login.png'; // Adjusted path
import CenterImage from '../img/image.png'; // Add your centered image here

const Forgetpass = () => {
  const [email, setEmail] = useState(''); // State for email

  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password reset link sent to your email!'); // Notify user of success
      } else {
        alert(`Error: ${data.message}`); // Handle errors
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="form-container">
        <h2 className="forgetpass">Forgot Password?</h2>
        <p className="text-forgetpass">
          Don’t worry! It happens. Please enter the <br />
          email associated with your account.
        </p>
        <form onSubmit={handlePasswordReset}> {/* Attach handlePasswordReset to form submission */}
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email Address"
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>

      {/* Background Image Section */}
      <div className="image-container" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <p className="welcome-text">Welcome to</p>
        <p className="nitro-tech-text">Nitro Tech</p>
        <img src={CenterImage} alt="Centered Logo" className="center-img" />
      </div>
    </div>
  );
};

export default Forgetpass;
