// Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Import images
import img22 from '../img/22.png';
import img33 from '../img/33.png';
import taskPlan from '../img/task_plan.png';
import Slider from './Slider';

// Mock function to simulate fetching notifications
const fetchNotifications = () => {
  return [
    {
      id: 1,
      text: "Biometric Course Registration Pending",
      time: "May 13, 09:00 AM",
    },
    {
      id: 2,
      text: "Biometric Check-in for CS 162",
      time: "May 16, 08:00 AM",
    },
  ];
};

// Mock function to simulate fetching recent activities
const fetchRecentActivities = () => {
  return [
    {
      id: 1,
      text: "Log in to work",
      time: "Today, 10:30 AM",
    },
    {
      id: 2,
      text: "Log out from work",
      time: "Today, 10:00 AM",
    },
    {
      id: 3,
      text: "Requested Leave for Circuit Theory",
      time: "Yesterday, 01:00 PM",
    },
  ];
};

// Reusable Widget component
const Widget = ({ title, content, image, linkTo }) => {
  const WidgetContent = (
    <div className="widget">
      <h2>{title}</h2>
      {image && <img src={image} alt={`${title} icon`} />}
      <p>{content}</p>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="widget-link" aria-label={title}>
      {WidgetContent}
    </Link>
  ) : (
    WidgetContent
  );
};

const Dashboard = () => {
  const [userRole, setUserRole] = useState('Admin'); // تم إضافة userRole هنا
  const [currentTime, setCurrentTime] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Admin specific states
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentTime(now.toLocaleDateString(undefined, options));

    // Fetch notifications and recent activities when the component mounts
    const fetchedNotifications = fetchNotifications();
    setNotifications(fetchedNotifications);

    const fetchedActivities = fetchRecentActivities();
    setRecentActivities(fetchedActivities);
  }, []);

  // Employee Dashboard section
  if (userRole === 'Employee') {
    return (
      <div className="employdashboard-container">
        <div className="employdashboard-header">
          <h1 className="employdashboard-title">Dashboard</h1>
          <p className="employdashboard-current-time">{currentTime}</p>
        </div>

        <div className="employdashboard-content">
          <div className="employdashboard-left">
            <Widget title="Total Courses" content="11 Approved" image={img22} />
            <Widget title="Task" content="5 Pending" image={taskPlan} linkTo="/task" />
            <Widget title="Professional Test" content="2 Scheduled" image={img33} />
            <div className="employdashboard-widget-slider-container">
              <Slider />
            </div>
          </div>

          <div className="employdashboard-right">
            <div className="employdashboard-recent-activity">
              <h2 className="employdashboard-recent-activity-header">Recent Activity</h2>
              <div className="employdashboard-recent-activity-columns">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="employdashboard-activity-column">
                    <span className="employdashboard-activity-icon">
                      <ion-icon name="log-in-outline"></ion-icon>
                    </span>
                    <div>
                      <p className="employdashboard-activity-text">{activity.text}</p>
                      <p className="employdashboard-activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="employdashboard-alerts-section">
              <h2>Alerts</h2>
              {notifications.map(notification => (
                <div key={notification.id} className="employdashboard-alert-item">
                  <span className="employdashboard-alert-icon">⚠️</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p className="employdashboard-alerts-text">{notification.text}</p>
                    <p className="employdashboard-alert-time">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard section
  if (userRole === 'Admin') {
    // Handle event image upload
    const handleEventImageUpload = (e) => setEventImage(e.target.files[0]);

    // Handle event form submission
    const handleEventSubmit = (e) => {
      e.preventDefault();
      setEventTitle('');
      setEventDescription('');
      setEventImage(null);
      alert('Event added successfully!');
    };

    // Handle alert form submission
    const handleAlertSubmit = (e) => {
      e.preventDefault();
      if (!alertTitle || !alertDescription) {
        alert('Please enter an alert title and description.');
        return;
      }

      const newAlert = {
        title: alertTitle,
        description: alertDescription,
        time: new Date().toLocaleString(),
      };

      console.log('Alert sent:', newAlert);
      alert('Alert sent successfully!');
      setAlertTitle('');
      setAlertDescription('');
    };

    return (
      <div className="admin-dashboard-container">
        <div className='event-admin-dashboard'>
          <h2>Add Event</h2>
          <form onSubmit={handleEventSubmit} className="admin-form">
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
            <input type="file" onChange={handleEventImageUpload} />
            <button type="submit">Add Event</button>
          </form>
        </div>

        <div className="alert-section">
          <h2>Send Alert</h2>
          <form onSubmit={handleAlertSubmit} className="admin-form">
            <input
              type="text"
              placeholder="Alert Title"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              required
            />
            <textarea
              className="alert-textarea"
              placeholder="Alert Description"
              value={alertDescription}
              onChange={(e) => setAlertDescription(e.target.value)}
              required
            />
            <button type="submit">Send Alert</button>
          </form>
        </div>
      </div>
    );
  }

  return <div><h2>Access Denied</h2></div>;
};

export default Dashboard;
