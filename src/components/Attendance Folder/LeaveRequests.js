import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveRequests.css';

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [statusMessages, setStatusMessages] = useState([]);

  // Fetch leave requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/leave-requests/');
        setRequests(response.data); // Assume the response is an array of leave requests
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Handle status update for a leave request
  const handleStatusUpdate = async (index, status) => {
    try {
      const request = requests[index];

      // Update the status in the backend
      await axios.patch(`/api/leave-requests/${request.id}/`, {
        status,
      });

      // Update the status in the frontend
      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        updatedRequests[index] = { ...updatedRequests[index], status };
        return updatedRequests;
      });

      // Notify the employee
      await axios.post('/api/notifications/', {
        title: `Leave Request ${status}`,
        message: `Your leave request from ${request.startDate} to ${request.endDate} has been ${status.toLowerCase()}.`,
      });

      // Update status message to display in the UI
      setStatusMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = `You have ${status.toLowerCase()}d the request.`;
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  return (
    <div className="leave-requests">
      <h3>Leave Requests</h3>
      {requests.length === 0 ? (
        <p>No leave requests available.</p>
      ) : (
        requests.map((request, index) => (
          <div key={index} className="request">
            <p><strong>Employee:</strong> {request.employeeName}</p>
            <p><strong>Start Date:</strong> {request.startDate}</p>
            <p><strong>End Date:</strong> {request.endDate}</p>
            <p><strong>Reason:</strong> {request.reason}</p>
            <p><strong>Request Time:</strong> {request.requestTime}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <div className="button-container">
              <button
                className="approve"
                onClick={() => handleStatusUpdate(index, 'Approved')}
              >
                Approve
              </button>
              <button
                className="reject"
                onClick={() => handleStatusUpdate(index, 'Rejected')}
              >
                Reject
              </button>
            </div>
            {statusMessages[index] && (
              <p className="status-message">{statusMessages[index]}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default LeaveRequests;
