import React, { useState } from 'react'; // Import necessary React hooks
import { Link } from 'react-router-dom'; // Import Link for client-side routing
import './Forget.css'; // Ensure correct path to your CSS
import BackgroundImage from '../img/Login.png'; // Background image path
import CenterImage from '../img/login-img.png'; // Centered image path

// Component for "Forgot Password" functionality
const Forgetpass = () => {
  // useState hook to manage the email input field's state
  const [email, setEmail] = useState(''); 

  // Function to handle password reset form submission
  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Sending a POST request to the backend for password reset
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON format
        },
        body: JSON.stringify({ email }), // Send the email entered by the user
      });

      const data = await response.json(); // Parse the response JSON

      // Check if the request was successful
      if (response.ok) {
        alert('Password reset link sent to your email!'); // Notify user
      } else {
        alert(`Error: ${data.message}`); // Handle server-side errors
      }
    } catch (error) {
      console.error('Error:', error); // Log errors to the console for debugging
      alert('Failed to send reset link. Please try again.'); // Show error message
    }
  };

  return (
    <div className="forgot-password-container">
      {/* Form Container */}
      <div className="forgetpass-form-container">
        <h2 className="forgetpass">Forgot Password?</h2>
        <p className="forgetpass-text">
          Don’t worry! It happens. Please enter the <br />
          email associated with your account.
        </p>
        
        {/* Form to collect user email and trigger password reset */}
        <form onSubmit={handlePasswordReset}> {/* Attach the submit handler */}
          <input
            type="email"
            placeholder="Enter your email" // Input placeholder text
            aria-label="Email Address" // Accessibility label
            value={email} // Bind state to the input field
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            required // Make field mandatory
          />
          <button type="submit">Send Reset Link</button> {/* Submit button */}
        </form>

        {/* Link back to the login page */}
        <p className="forgetpass-back-to-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>

      {/* Right section with background image and logo */}
      <div className="forgetpass-image-container" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <p className="forgetpass-welcome-text">Welcome to</p> {/* Welcome message */}
        <p className="forgetpass-nitro-tech-text ">Nitro Tech</p> {/* Company/brand name */}
        <img src={CenterImage} alt="Centered Logo" className="forgetpass-center-img" /> {/* Logo */}
      </div>
    </div>
  );
};

export default Forgetpass; // Export the component to use it elsewhere
