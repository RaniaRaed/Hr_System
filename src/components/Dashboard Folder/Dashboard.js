// Import React library and the CSS file for styling the component
import React from 'react';
import './Dashboard.css'; 

// Functional component for the Dashboard
const Dashboard = () => {
    return (
        // Container that wraps the entire dashboard layout
        <div className="dashboard-container">
            {/* Dashboard title */}
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Section for different widgets */}
            <div className="dashboard-widgets">
                {/* Widget 1: Total Courses */}
                <div className="widget">
                    <h2>Total Courses</h2> {/* Widget title */}
                    <p>11 Approved</p> {/* Widget content */}
                </div>

                {/* Widget 2: Task */}
                <div className="widget">
                    <h2>Task</h2> 
                    <p>11 Approved</p> 
                </div>

                {/* Widget 3: Professional Test */}
                <div className="widget">
                    <h2>Professional Test</h2> 
                    <p>11 Approved</p>
                </div>
            </div>
        </div>
    );
};

// Export the component to use it in other parts of the application
export default Dashboard;
