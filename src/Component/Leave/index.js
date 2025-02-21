import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';

import "./index.css";

const LeaveForm = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const { slide } = useTheme();
  const location = useLocation();

  const leaveDropdownsoption = () =>{
    switch(location.pathname){
      case "/casualleave":
        return ['Select Leave type','casual Leave'];
      case "/paidleave":
        return ['Select Leave type','paid leave'];
      case '/unpaidleave':
        return ['Select Leave type','unpaid leave']
      default:
        return['No leave option with this path']
    }
  }

  const option = leaveDropdownsoption();

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const selectedDate = new Date(fromDate);
    const difference = Math.ceil(
      (selectedDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    if (difference < 10) {
      setError("You can apply for leave only 10 days in advance.");
      return;
    }

    alert("Leave Applied Successfully");
    setError("");
  };

  return (
    <div className={slide === "false" ? "leave-form-container" : "leave-form-container1" }>
      <h2 className="tll">Apply for Leave</h2>
      <p className="pp1">
        NOTE: <span>Leave Can be Applied 10 Days in Advance</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="date-time-container">
          <div className="date-time-column">
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div className="date-time-column">
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="date-time-container">
          <div className="date-time-column">
            <label>From Time</label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              required
            />
          </div>
          <div className="date-time-column">
            <label>To Time</label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              required
            />
          </div>
        </div>

        <label>Leave Type</label>
        <select className="dropdown">
        {option.map((option, index) => (
          <option key={index} value={option}>
            {option} 
          </option>
        ))}
       
      </select>

        <label>Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LeaveForm;