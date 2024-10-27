import React from 'react';
import './AttendanceRecords.css';

const AttendanceRecords = ({ adminRecords = [] }) => {
  const sampleRecords = [
    { course: 'Marketing', checkInTime: '08:30 AM', status: 'present' },
    { course: 'Photography', checkInTime: '09:00 AM', status: 'absent' },
    { course: 'HR', checkInTime: '10:00 AM', status: 'present' },
    
  ];

  // Use adminRecords if provided; otherwise, default to sampleRecords
  const records = adminRecords.length > 0 ? adminRecords : sampleRecords;

  return (
    <div className="attendance-records">
      <h3>Attendance Records</h3>
      {records.length === 0 ? (
        <p>No attendance records available.</p>
      ) : (
        records.map((record, index) => (
          <div key={index} className={`record ${record.status}`}>
            <div className="record-info">
              <h4>{record.course}</h4>
              <p>Check-In Time: {record.checkInTime}</p>
            </div>
            <div className="button-container">
              <button className={`status ${record.status}`} disabled>
                {record.status === 'present' ? 'Present' : 'Absent'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceRecords;
