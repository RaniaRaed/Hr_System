import React from 'react';
import './AttendanceSummary.css';

const AttendanceSummary = ({ attendancePercentage }) => {
  return (
    <div className="attendance-summary">
      <div
        className={`water ${attendancePercentage < 50 ? 'low' : 'high'}`}
        style={{ height: `${attendancePercentage}%` }}
      ></div>
      <h3>Attendance Summary</h3>
      <div className="attendance-percentage">
        {attendancePercentage}% Present
      </div>
    </div>
  );
};

export default AttendanceSummary;
