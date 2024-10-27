import React, { useEffect } from 'react';
import './Topbar.css'; // Import CSS for styling the top bar
import profileImage from '../../img/Ran-prof.png'; // Import the profile image

const TopBar = () => {
    // Effect hook to dynamically load Ionicons for icons
    useEffect(() => {
        // Create and append script for modern browsers
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        script.type = 'module';
        document.body.appendChild(script); // Append the script to the body

        // Create and append script for legacy browsers
        const scriptNoModule = document.createElement('script');
        scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        scriptNoModule.setAttribute('nomodule', ''); // Add nomodule attribute for older browsers
        document.body.appendChild(scriptNoModule); // Append the nomodule script

        // Cleanup function to remove scripts when component unmounts
        return () => {
            document.body.removeChild(script); // Remove modern browser script
            document.body.removeChild(scriptNoModule); // Remove legacy browser script
        };
    }, []); // This effect runs once when the component mounts

    return (
        <div className="topbar"> {/* Top bar container */}
            <div className="topbar-search"> {/* Search input container */}
                <label>
                    <input type="text" placeholder="Search..." /> {/* Search input */}
                    <ion-icon name="search-outline"></ion-icon> {/* Search icon */}
                </label>
            </div>

            <div className="topbar-right"> {/* Right section for notifications and profile */}
                <div className="topbarnotification-icon"> {/* Notification icon */}
                    <ion-icon name="notifications-outline"></ion-icon> {/* Notification icon */}
                </div>
                <div className="topbar-profile"> {/* Profile image container */}
                    <img src={profileImage} alt="Profile" /> {/* Profile image */}
                </div>
            </div>
        </div>
    );
};

export default TopBar; // Export the TopBar component for use in other parts of the app
