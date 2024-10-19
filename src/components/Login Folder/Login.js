import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Link for navigation between routes
import './Login.css'; // Import CSS for styling the component
import BackgroundImage from '../img/Login.png'; // Background image for styling
import CenterImage from '../img/login-img.png'; // Logo/image in the center

const Login = () => {
  // Define state variables for storing user input values
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  // Handler function triggered on form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    try {
      // Make a POST request to the backend login API
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST', // Send data using POST method
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If the response is OK, login was successful
        alert('Login successful!'); // Notify the user
        // Optionally, store a token or redirect the user
      } else {
        // If login fails, show an error message
        alert(`Error: ${data.message}`); // Display backend error message
      }
    } catch (error) {
      // Catch network or server errors
      console.error('Error:', error); // Log error to console
      alert('Login failed. Please try again.'); // Show error to the user
    }
  };

  return (
    <div className="login-container">
      {/* Left section - Form for login */}
      <div className="form-login-container">
        <h1 className='log-in-h'>Log In</h1> {/* Heading */}
        <p className="login-text-aligned">Enter your account details</p> {/* Subtitle */}
        
        <form onSubmit={handleLogin}> {/* Attach handleLogin to form submit event */}
          <input
            type="email"
            placeholder="Email" // Placeholder for email input
            value={email} // Bind input to email state
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            required // Ensure input is mandatory
          />
          
          <input
            type="password"
            placeholder="Password" // Placeholder for password input
            value={password} // Bind input to password state
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required // Ensure input is mandatory
          />

          {/* Link to 'Forgot Password' page */}
          <h5 className="login-go-to-forgetpass">
            <Link to="/forgot-password">Forgot Password?</Link>
          </h5>

          {/* Submit button to trigger login */}
          <button type="submit">Log In</button>
        </form>
      </div>

      {/* Right section - Background image with centered logo */}
      <div 
        className="login-image-container" 
        style={{ backgroundImage: `url(${BackgroundImage})` }} // Inline background styling
      >
        <p className="login-welcome-text">Welcome to</p> {/* Heading text */}
        <p className="login-nitro-tech-text">Nitro Tech</p> {/* Subtitle */}
        <img src={CenterImage} alt="Centered Logo" className="login-center-img" /> {/* Centered logo */}
      </div>
    </div>
  );
};

export default Login; // Export the Login component for use in other parts of the app
