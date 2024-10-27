import React, { useEffect, useState } from 'react';
import './LeaveRequests.css';
import { notify } from './AttendanceNotifications'; // Import the notify function

const LeaveRequests = ({ onUpdateRequest }) => {
  const [requests, setRequests] = useState([]);
  const [statusMessages, setStatusMessages] = useState([]);

  // Sample Fake Leave Requests
  const fakeLeaveRequests = [
    {
      id: 1,
      employeeName: 'Alice Johnson',
      startDate: '2024-11-01',
      endDate: '2024-11-05',
      reason: 'Vacation',
      requestTime: '2024-10-25 10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      employeeName: 'Bob Smith',
      startDate: '2024-11-10',
      endDate: '2024-11-12',
      reason: 'Medical Leave',
      requestTime: '2024-10-26 09:30 AM',
      status: 'Pending',
    },
    {
      id: 3,
      employeeName: 'Charlie Brown',
      startDate: '2024-11-15',
      endDate: '2024-11-20',
      reason: 'Family Emergency',
      requestTime: '2024-10-27 11:15 AM',
      status: 'Pending',
    },
    {
      id: 4,
      employeeName: 'Daisy White',
      startDate: '2024-11-22',
      endDate: '2024-11-25',
      reason: 'Wedding',
      requestTime: '2024-10-28 14:45 PM',
      status: 'Pending',
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      const leaveRequests = fakeLeaveRequests; // Simulating an API call
      setRequests(leaveRequests);
    };

    fetchRequests();
  }, []);

  const handleStatusUpdate = async (index, status) => {
    let updateFunction;
    if (status === 'Approved') {
      updateFunction = async (id) => {
        console.log(`Leave request ${id} approved`); // Simulate API call
      };
    } else {
      updateFunction = async (id) => {
        console.log(`Leave request ${id} rejected`); // Simulate API call
      };
    }

    try {
      await updateFunction(requests[index].id);
      
      // Update the request's status in the state
      setRequests(prevRequests => {
        const updatedRequests = [...prevRequests];
        updatedRequests[index] = { ...updatedRequests[index], status };
        return updatedRequests;
      });
      
      // Notify the employee about the status update
      notify(requests[index].employeeName, status, 'Employee'); // Send notification to the employee

      // Update status message to show in the interface
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
