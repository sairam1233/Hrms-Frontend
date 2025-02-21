import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './index.css';

const AttendancePage = () => {
  const [data, setData] = useState([]);
  const { slide } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          alert('Token not found! Please log in.');
          return;
        }

        const response = await fetch('http://localhost:5000/logs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }

        const responseData = await response.json();
        
        const formattedData = responseData.attendanceLogStatus.map(entry => ({
          date: entry.Logdate,
          time: entry.LogTime,
          leave: entry.LeaveStatus,
          effectiveHours: entry.EffectiveHours,
          grossHours: entry.GrossHours,
          arrival: entry.ArrivalStatus,
          log: entry.Logstatus
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();

    const attendanceElement = document.querySelector('.attendance-container');
    if (attendanceElement) {
      attendanceElement.classList.add('show');
    }
  }, []);

  const handleNavigationAttendanceRequests = () => {
    navigate('/AttendanceRequest');
  };

  const handleNavigationAttendancelog = () => {
    navigate('/attendancelogs');
  };

  return (
    <div className={slide === "false" ? 'attendance-container' : 'attendance-con'}>
      <h1 className="page-title">Attendance Page</h1>
      <div className="info-box">
        <div className="title-container-left">
          <h3 className="info-title">Log & Request</h3>
        </div>
        <div className="button-container-right">
          <button className="info-heading" onClick={handleNavigationAttendancelog}>Attendance Log</button>
          <button className="info-heading" onClick={handleNavigationAttendanceRequests}>Attendance Requests</button>
        </div>
      </div>
      <div className="attendance-table-wrapper">
        <div className="table-container">
          <table className="attendance-table">
            <thead className="sticky-header">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Leave</th>
                <th>Effective Hours</th>
                <th>Gross Hours</th>
                <th>Arrival</th>
                <th>Log</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.leave}</td>
                    <td>{entry.effectiveHours}</td>
                    <td>{entry.grossHours}</td>
                    <td>{entry.arrival}</td>
                    <td>
                      {entry.log === 'Yes' ? (
                        <FaCheckCircle style={{ color: 'green' }} />
                      ) : entry.log === 'No' ? (
                        <FaTimesCircle style={{ color: 'red' }} />
                      ) : (
                        entry.log // Display text for WH and EL
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No attendance data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;