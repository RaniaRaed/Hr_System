import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Topbar from './Topbar Folder/Topbar'; // Adjust the import path
import Sidebar from './sidebar Folder/Sidebar.js';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="layout-main-container">
                <Topbar />
                <div className="layout-content">
                    <Outlet /> {/* Render child routes here */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
