// AttendanceSummary.js
import React from 'react';
import './AttendanceSummary.css';

const AttendanceSummary = ({ attendancePercentage, absentPercentage }) => {
  return (
    <div className="attendance-summary">
      <div className="water" style={{ height: `${attendancePercentage}%` }}></div>
      <h3>Attendance Summary</h3>
      <div className="attendance-stats">
        <div className="stat">
          <h2>{attendancePercentage}%</h2>
          <p>Present</p>
        </div>
        <div className="stat">
          <h2>{absentPercentage}%</h2>
          <p>Absent</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
