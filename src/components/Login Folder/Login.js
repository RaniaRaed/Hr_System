import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import CSS for styling
import BackgroundImage from '../img/Login.png'; // Adjusted path
import CenterImage from '../img/image.png'; // Add your centered image here

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send the credentials
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!'); // Notify user of success
        // Here you could redirect or store a token if needed
      } else {
        alert(`Error: ${data.message}`); // Handle errors
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className='log-in-h'>Log In</h1>
        <p className="text-aligned">Enter your account details</p>
        <form onSubmit={handleLogin}> {/* Attach handleLogin to form submission */}
          <input
            type="email"
            placeholder="Email"
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password} // Bind state to input
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required
          />
          <h5 className="go-to-forgetpass"><Link to="/forgot-password">Forgot Password?</Link></h5>
          <button type="submit">Log In</button>
        </form>
      </div>

      {/* Right Side - Background Image with Centered Image */}
      <div className="image-container" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <p className="welcome-text">Welcome to</p> {/* Big font for welcome */}
        <p className="nitro-tech-text">Nitro Tech</p> {/* Smaller font for Nitro Tech */}
        <img src={CenterImage} alt="Centered Logo" className="center-img" />
      </div>
    </div>
  );
};

export default Login;
