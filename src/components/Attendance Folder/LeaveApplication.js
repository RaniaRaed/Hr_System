import React, { useState } from 'react';
import axios from 'axios';
import './LeaveApplication.css';

const LeaveApplication = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://your-api-url.com/holiday-requests/', {
        startDate,
        endDate,
        reason,
      });
      console.log('Leave request submitted:', response.data);
    } catch (err) {
      setError('Error submitting leave request: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="leave-application">
      <h3>Apply Leave</h3>
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
