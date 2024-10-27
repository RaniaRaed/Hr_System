import './AttendanceNotifications.css';
import React, { useState, useEffect } from 'react';

// Array to store all notifications
let notifications = [];

// Create notification message based on employee role
const createNotificationMessage = (employeeName, status, role) => {
  if (role === 'Employee') {
    return `Dear ${employeeName}, your leave request was ${status.toLowerCase()}.`;
  }
  return ''; // Return empty if the role is not "Employee"
};

// Add notification to the notifications array
const addNotification = (message) => {
  const notification = {
    id: Date.now(),
    message,
    timestamp: new Date().toLocaleString(),
  };
  notifications.push(notification);
};

// Remove notification by ID
const removeNotification = (id) => {
  notifications = notifications.filter(notification => notification.id !== id);
};

// Get all notifications
const getNotifications = () => {
  return notifications;
};

// Attendance Notifications Component
const AttendanceNotifications = () => {
  const [notificationsList, setNotificationsList] = useState(getNotifications());

  // Update notifications list when component mounts
  useEffect(() => {
    const updateNotifications = () => {
      setNotificationsList(getNotifications());
    };

    const intervalId = setInterval(updateNotifications, 1000); // Check for updates every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Handle removal of notification
  const handleRemoveNotification = (id) => {
    removeNotification(id);
    setNotificationsList(getNotifications());
  };

  return (
    <div className="attendanceLeave-notification-container">
      {notificationsList.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notificationsList.map(notification => (
          <div key={notification.id} className="attendanceLeave-notification">
            <p>
              {notification.message}
              <button onClick={() => handleRemoveNotification(notification.id)}>X</button>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

// Notify function to create and add notification
const notify = (employeeName, status, role) => {
  const message = createNotificationMessage(employeeName, status, role);
  if (message) {
    addNotification(message);
  }
};

export { AttendanceNotifications, notify };
