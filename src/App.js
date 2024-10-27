import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login Folder/Login';
import Forgetpass from './components/Forgetpass Folder/Forget';
import Attendance from './components/Attendance Folder/Attendance';
import Payroll from './components/Payroll Folder/Payroll';
import Inbox from './components/Inbox Folder/Inbox';
import Task from './components/Tasks Folder/Task';
import Dashboard from './components/Dashboard Folder/Dashboard';
import Layout from './components/Layout Folder/Layout'; // Import Layout component


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<Forgetpass />} />

                {/* Routes with Layout */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/task" element={<Task />} />
                    {/* <Route path="*" element={<Navigate to="/login" />} /> */}

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
