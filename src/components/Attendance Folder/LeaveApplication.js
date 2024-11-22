import React, { useState } from 'react';
import axios from 'axios';
import './LeaveApplication.css';

const LeaveApplication = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to refresh the token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
      if (!refreshToken) {
        throw new Error('No refresh token available. Please log in again.');
      }
      const response = await axios.post('/api/token/refresh/', {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      localStorage.setItem('accessToken', newAccessToken); // Save new access token
      return newAccessToken;
    } catch (err) {
      console.error('Error refreshing token:', err);
      setError('Session expired. Please log in again.');
      return null;
    }
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      let token = localStorage.getItem('accessToken'); // Retrieve access token

      if (!token) {
        throw new Error('User is not logged in. Please log in.');
      }

      const response = await axios.post(
        '/api/holiday-requests/',
        {
          start_date: startDate,
          end_date: endDate,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      setMessage('Leave request submitted successfully!');
      console.log('Leave request submitted:', response.data);
    } catch (err) {
      // Check if error is due to token expiration
      if (err.response?.status === 401) {
        console.warn('Access token expired. Attempting to refresh...');
        const newToken = await refreshAccessToken();
        if (newToken) {
          // Retry request with new token
          try {
            const retryResponse = await axios.post(
              '/api/holiday-requests/',
              {
                start_date: startDate,
                end_date: endDate,
                reason,
              },
              {
                headers: {
                  Authorization: `Bearer ${newToken}`, // Use refreshed token
                },
              }
            );

            setMessage('Leave request submitted successfully!');
            console.log('Leave request submitted:', retryResponse.data);
          } catch (retryErr) {
            console.error('Retry failed:', retryErr);
            setError('Failed to submit leave request. Please try again.');
          }
        }
      } else {
        setError('Error submitting leave request: ' + (err.response?.data?.detail || err.message));
        console.error(err);
      }
    }
  };

  return (
    <div className="leave-application">
      <h3>Apply Leave</h3>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

        <label>Reason for leave:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required></textarea>

        <button type="submit">Submit Leave Request</button>
      </form>
    </div>
  );
};

export default LeaveApplication;
