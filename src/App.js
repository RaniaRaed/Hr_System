import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login Folder/Login';
import Forgetpass from './components/Forgetpass Folder/Forget';
import Attendance from './components/Attendance Folder/Attendance';
import Payroll from './components/Payroll Folder/Payroll';
import Inbox from './components/Inbox Folder/Inbox';
import Task from './components/Tasks Folder/Task';
import Help from './components/Dashboard Folder/Help';
import Profile from './components/Layout Folder/Profile';
import Dashboard from './components/Dashboard Folder/Dashboard';
import Layout from './components/Layout Folder/Layout';
import { useState, useEffect } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        // Check if the access token is available in localStorage
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true); // Set isAuthenticated to true if the access token exists
        }
    }, []); // Only run on mount

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<Forgetpass />} />

                {/* Routes with Layout and ProtectedRoute */}
                <Route element={<Layout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/help"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Help />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/attendance"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Attendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payroll"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Payroll />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/inbox"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Inbox />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/task"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Task />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
