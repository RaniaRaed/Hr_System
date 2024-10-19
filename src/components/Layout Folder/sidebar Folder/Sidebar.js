import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import CSS for sidebar styling
import sidebarlogo from '../../img/log_sidebar.png'; // Import logo image

const Sidebar = () => {
  // State to manage sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Effect hook to load Ionicons scripts dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    script.type = 'module';
    document.body.appendChild(script); // Append module script to the body

    const scriptNoModule = document.createElement('script');
    scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    scriptNoModule.setAttribute('nomodule', ''); // For older browsers
    document.body.appendChild(scriptNoModule); // Append nomodule script
  }, []); // Runs only once when the component mounts

  return (
    <>
      {/* Sidebar container */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-navigation">
          {/* Logo Section */}
          <div className="sidebar-logo">
            <span className="sidebar-img-logo">
              <img src={sidebarlogo} alt="Sidebar Logo" /> {/* Logo image */}
            </span>
            <h1 className="sidebar-logo-text">Nitro Tech</h1> {/* Logo text */}
          </div>

          {/* Main Navigation Links */}
          <ul>
            <li>
              <Link className="sidebar-links" to="/dashboard" aria-label="Dashboard">
                <span className="sidebar-icon">
                  <ion-icon name="bar-chart-outline"></ion-icon> {/* Dashboard icon */}
                </span>
                <span className="sidebar-title">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link className="sidebar-links" to="/task" aria-label="Task">
                <span className="sidebar-icon">
                  <ion-icon name="create-outline"></ion-icon> {/* Task icon */}
                </span>
                <span className="sidebar-title">Task</span>
              </Link>
            </li>

            <li>
              <Link className="sidebar-links" to="/payroll" aria-label="Payroll">
                <span className="sidebar-icon">
                  <ion-icon name="card-outline"></ion-icon> {/* Payroll icon */}
                </span>
                <span className="sidebar-title">Payroll</span>
              </Link>
            </li>

            <li>
              <Link className="sidebar-links" to="/inbox" aria-label="Inbox">
                <span className="sidebar-icon">
                  <ion-icon name="browsers-outline"></ion-icon> {/* Inbox icon */}
                </span>
                <span className="sidebar-title">Inbox</span>
              </Link>
            </li>

            <li>
              <Link className="sidebar-links" to="/attendance" aria-label="Attendance">
                <span className="sidebar-icon">
                  <ion-icon name="calendar-number-outline"></ion-icon> {/* Attendance icon */}
                </span>
                <span className="sidebar-title">Attendance</span>
              </Link>
            </li>
          </ul>

          {/* Bottom Section with Divider and Extra Links */}
          <div className="sidebar-bottom-section">
            <hr className="sidebar-divider" /> {/* Divider Line */}
            <ul>
              <li>
                <Link className="sidebar-links" to="/settings" aria-label="Settings">
                  <span className="sidebar-icon">
                    <ion-icon name="settings-outline"></ion-icon> {/* Settings icon */}
                  </span>
                  <span className="sidebar-title">Settings</span>
                </Link>
              </li>

              <li>
                <Link className="sidebar-links" to="/help" aria-label="Help">
                  <span className="sidebar-icon">
                    <ion-icon name="information-circle-outline"></ion-icon> {/* Help icon */}
                  </span>
                  <span className="sidebar-title">Help</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Overlay for when sidebar is open */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>} {/* Click to close sidebar */}
    </>
  );
};

export default Sidebar;
