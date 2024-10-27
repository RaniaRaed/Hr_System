import React from 'react';
import './EmployeeAttendanceList.css';

const EmployeeAttendanceList = ({ employees }) => {
  return (
    <div className="employee-attendance-list">
      <h3>Employee Attendance List</h3>
      {employees.length === 0 ? (
        <p>No employees data available.</p>
      ) : (
        employees.map((employee, index) => (
          <div key={index} className="employee-record">
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Check-In Time:</strong> {employee.checkInTime}</p>
            <p><strong>Check-Out Time:</strong> {employee.checkOutTime}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeAttendanceList;
