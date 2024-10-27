import React, { useState, useEffect } from 'react';
import AttendanceSummary from './AttendanceSummary';
import DateNavigation from './DateNavigation';
import AttendanceRecords from './AttendanceRecords';
import LeaveRequests from './LeaveRequests';
import LeaveApplication from './LeaveApplication';
import EmployeeAttendanceList from './EmployeeAttendanceList'; 
import { AttendanceNotifications, notify } from './AttendanceNotifications'; // Adjust import based on your structure
import { getAllAttendanceForAdmin, getMonthlyAttendanceForEmployee } from './attendanceService'; 
import './Attendance.css';

const Attendance = () => {
  const [userRole, setUserRole] = useState('Employee'); 
  const [attendanceData, setAttendanceData] = useState({
    attendancePercentage: 75,
    absentPercentage: 25,
  });
  const [records, setRecords] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([
    { employeeName: 'John Doe', startDate: '2024-10-10', endDate: '2024-10-12', reason: 'Family event', requestTime: '2024-10-01 08:30 AM', status: 'Pending' },
    { employeeName: 'Jane Smith', startDate: '2024-10-15', endDate: '2024-10-16', reason: 'Medical appointment', requestTime: '2024-10-02 09:45 AM', status: 'Pending' },
  ]);
  const [notifications, setNotifications] = useState([]); // State to hold notifications for employees
  const employees = [
    { name: 'Alice', checkInTime: '08:00 AM', checkOutTime: '05:00 PM' },
    { name: 'Bob', checkInTime: '08:15 AM', checkOutTime: '05:15 PM' },
    { name: 'Charlie', checkInTime: '08:30 AM', checkOutTime: '05:30 PM' },
  ];

  const fetchAttendanceData = async () => {
    try {
      if (userRole === 'Admin') {
        const attendanceRecords = await getAllAttendanceForAdmin();
        setRecords(attendanceRecords);
      } else if (userRole === 'Employee') {
        const monthlyRecords = await getMonthlyAttendanceForEmployee();
        setRecords(monthlyRecords);
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [userRole]);

  const handleUpdateRequest = (index, status) => {
    setLeaveRequests(prevRequests => {
      const updatedRequests = [...prevRequests];
      updatedRequests[index] = { ...updatedRequests[index], status };
      return updatedRequests;
    });

    // Sending notification to the employee
    const notificationMessage = `Dear ${leaveRequests[index].employeeName}, your leave request has been ${status.toLowerCase()}d.`;
    setNotifications(prev => [...prev, notificationMessage]); // Add the notification to the state
  };

  return (
    <div className="Attendance-app">
      <div className="Attendance-main-container">
        <div className="Attendance-left-side">
          {(userRole === 'Admin' || userRole === 'Employee') && <DateNavigation />}
          {userRole === 'Admin' && <EmployeeAttendanceList employees={employees} />}
          {userRole === 'Employee' && <AttendanceRecords records={records} />}
          
          {/* Display Notifications for Employee */}
          {userRole === 'Employee' && <AttendanceNotifications notifications={notifications} />}
        </div>

        <div className="Attendance-right-side">
          <AttendanceSummary 
            attendancePercentage={attendanceData.attendancePercentage}
            absentPercentage={attendanceData.absentPercentage}
          />
          
          {userRole === 'Employee' && <LeaveApplication />}
          
          {userRole === 'Admin' && (
            <LeaveRequests 
              requests={leaveRequests} 
              onUpdateRequest={handleUpdateRequest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
