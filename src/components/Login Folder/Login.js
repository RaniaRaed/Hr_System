import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import BackgroundImage from '../img/Login.png';
import CenterImage from '../img/login-img.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handler function for login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/login/', {
        email,
        password,
      });

      const user = response.data;

      if (user && user.access && user.refresh) {
        // Clear any existing tokens
        localStorage.clear();

        // Store tokens in localStorage
        localStorage.setItem('accessToken', user.access);
        localStorage.setItem('refreshToken', user.refresh);

        console.log('Login successful');

        // Fetch protected data after login
        await fetchProtectedData(user.access);

        // Navigate to dashboard on successful login
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  // Fetch protected data using the Bearer token
  const fetchProtectedData = async (token) => {
    try {
      const response = await axios.get('/api/protected-data', {
        headers: {
          Authorization: `Bearer ${token}`, // Use the Bearer token in the Authorization header
        },
      });
      console.log('Protected Data:', response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  return (
    <div className={styles.login_loginContainer}>
      <div className={styles.login_formContainer}>
        <h1 className={styles.login_logInHeader}>Log In</h1>
        <p className={styles.login_loginText}>Enter your account details</p>

        {error && <p className={styles.login_errorMessage}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            className={styles.login_inputField}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.login_inputField}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h5 className={styles.login_forgotPasswordLink}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </h5>
          <button className={styles.login_loginButton} type="submit">Log In</button>
        </form>
      </div>

      <div
        className={styles.login_imageContainer}
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <p className={styles.login_welcomeText}>Welcome to</p>
        <p className={styles.login_nitroTechText}>Nitro Tech</p>
        <img src={CenterImage} alt="Centered Logo" className={styles.login_centeredImage} />
      </div>
    </div>
  );
};

export default Login;
