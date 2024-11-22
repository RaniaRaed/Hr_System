import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

import img22 from '../img/22.png';
import img33 from '../img/33.png';
import taskPlan from '../img/task_plan.png';
import Slider from './Slider';

// Widget component
const Widget = ({ title, content, image, linkTo }) => {
  return (
    <div className="widget">
      <div className="widget-header">
        <img src={image} alt={title} className="widget-image" />
        <h3 className="widget-title">{title}</h3>
      </div>
      <p className="widget-content">{content}</p>
      {linkTo && <Link to={linkTo} className="widget-link">View More</Link>}
    </div>
  );
};

// Dashboard component
const Dashboard = () => {
  const [userRole, setUserRole] = useState('Employee');
  const [currentTime, setCurrentTime] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentTime(now.toLocaleDateString(undefined, options));

    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('/api/events/list/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data.results || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Fetch alerts from API
    const fetchAlertsFromAPI = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('/api/notifications/list/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure that the alerts are always an array, even if the response data is empty
        setAlerts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        // Fallback to dummy data if the fetch fails
        setAlerts(fetchAlerts());
      }
    };

    fetchEvents();
    fetchAlertsFromAPI();
    setRecentActivities(fetchRecentActivities()); // Dummy data for recent activities
  }, []);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { event_title: eventTitle, description: eventDescription };
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('You must be logged in to add events');
        return;
      }

      const response = await axios.post('/api/events/create/', newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Event added successfully!');
      setEvents([response.data, ...events]);
      setEventTitle('');
      setEventDescription('');
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response?.status === 401) {
        alert('Unauthorized: Please log in or check your credentials.');
      } else {
        alert('Failed to add event. Please try again.');
      }
    }
  };

  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    if (!alertTitle || !alertDescription) {
      alert('Please enter an alert title and description.');
      return;
    }

    const newAlert = {
      title: alertTitle,
      message: alertDescription,
    };

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('You must be logged in to send alerts');
        return;
      }

      const response = await axios.post('/api/notifications/create/', newAlert, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Notification sent successfully!');
      setAlerts([...alerts, response.data]);
      setAlertTitle('');
      setAlertDescription('');
    } catch (error) {
      console.error('Error sending notification:', error);
      if (error.response?.status === 401) {
        alert('Unauthorized: Please log in or check your credentials.');
      } else {
        alert('Failed to send notification. Please try again.');
      }
    }
  };

  const fetchAlerts = () => [
    { id: 1, text: "Biometric Course Registration Pending", time: "May 13, 09:00 AM" },
    { id: 2, text: "Biometric Check-in for CS 162", time: "May 16, 08:00 AM" },
  ];

  const fetchRecentActivities = () => [
    { id: 1, text: "Log in to work", time: "Today, 10:30 AM" },
    { id: 2, text: "Log out from work", time: "Today, 10:00 AM" },
    { id: 3, text: "Requested Leave for Circuit Theory", time: "Yesterday, 01:00 PM" },
  ];

  if (userRole === 'Employee') {
    return (
      <div className="employdashboard-container">
        <div className="employdashboard-header">
          <h1 className="employdashboard-title">Dashboard</h1>
          <p className="employdashboard-current-time">{currentTime}</p>
        </div>

        <div className="employdashboard-content">
          <div className="employdashboard-left">
            <Widget
              title="Total Courses"
              content={events.length > 0 ? events[0].event_title : "No Events Available"}
              image={img22}
            />
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
              {alerts.length === 0 ? (
                <p>No alerts available.</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className="employdashboard-alert-item">
                    <span className="employdashboard-alert-icon">⚠️</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className="employdashboard-alerts-text">{alert.message || alert.title}</p>
                      <p className="employdashboard-alert-time">{new Date(alert.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'Admin') {
    return (
      <div className="admin-dashboard-container">
        <div className="event-admin-dashboard">
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

  return <div>Loading...</div>;
};

export default Dashboard;
