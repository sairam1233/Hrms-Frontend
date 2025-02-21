import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import the React icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarComponent from '../Navbar'; // Import the Navbar component
import './index.css'; // Import the CSS file

function EmployeePage() {
  const [section, setSection] = useState('mydetails');
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      Cookies.remove('username');
      Cookies.remove('token');
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      <NavbarComponent isFullWidth={true} /> {/* Pass isFullWidth prop */}
      <div className="app-container">
        <NavPanel section={section} setSection={setSection} />
        <ContentArea section={section} />
      </div>
    </>
  );
}

function NavPanel({ section, setSection }) {
  return (
    <nav className="nav-panel">
      <NavCard 
        title="My Details" 
        sectionKey="mydetails" 
        active={section === 'mydetails'} 
        onClick={() => setSection('mydetails')} 
      />
      <NavCard 
        title="Designation" 
        sectionKey="designation" 
        active={section === 'designation'} 
        onClick={() => setSection('designation')} 
      />
      <NavCard 
        title="Exit Details" 
        sectionKey="exitdetails" 
        active={section === 'exitdetails'} 
        onClick={() => setSection('exitdetails')} 
      />
      <NavCard 
        title="Organization Chart" 
        sectionKey="organizationchart" 
        active={section === 'organizationchart'} 
        onClick={() => setSection('organizationchart')} 
      />
    </nav>
  );
}

function NavCard({ title, active, onClick }) {
  return (
    <div 
      className={`nav-card ${active ? 'active' : ''}`} 
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      <h3>{title}</h3>
    </div>
  );
}

function ContentArea({ section }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState({});
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/employee', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEmployeeDetails(data.employee || {});
        } else {
          console.error("Failed to fetch employee details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEmployeeDetails();
  }, [token]);

  const handlePasswordChange = async () => {
    if (newPassword === reenterPassword) {
      try {
        const response = await fetch('http://localhost:5000/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            oldPassword,
            newPassword
          })
        });

        if (response.ok) {
          setMessageType("success");
          setOldPassword('');
          setNewPassword('');
          setReenterPassword('');
          navigate('/')
          Cookies.remove('username');
          Cookies.remove('token');
          alert('Your password has been changed successfully. Please log in again.');
          
        } else {
          setMessage("Failed to change password");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred");
        setMessageType("error");
      }
    } else {
      setMessage("Passwords do not match");
      setMessageType("error");
    }
  };

  return (
    <main className="content-area">
      {section === "mydetails" && (
        <div className="card-grid">
          {/* Profile Details Card */}
          <Card>
            <div className="profile-section">
              <h3>Employee Details</h3>
              <div>
                <span className="profile-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={employeeDetails.Gender === 'Male' ? faMale : faFemale} />
                </span>
                <p className='pp11'><span className='sp-11'>ID: </span>{employeeDetails.EmployeeID || 'N/A'}</p>
                <p className='pp11'><span className='sp-11'>Name: </span>{employeeDetails.FullName || 'N/A'}</p>
                <p className='pp11'><span className='sp-11'>Email: </span>{employeeDetails.WorkEmail || 'N/A'}</p>
                <p className='pp11'><span className='sp-11'>Gender: </span>{employeeDetails.Gender || 'N/A'}</p>
                <p className='pp11'><span className='sp-11'>Birth Date: </span>{employeeDetails.DateOfBirth || 'N/A'}</p>
              </div>
            </div>
          </Card>

          {/* Change Password Card */}
          <Card>
            <h3>Change Password</h3>
            {message && (
              <p className={`message ${messageType}`}>{message}</p>
            )}
            <div className="form-group">
              <label htmlFor="oldPassword" className="form-label">Old Password: </label>
              <input 
                id="oldPassword"
                type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">New Password: </label>
              <input 
                id="newPassword"
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reenterPassword" className="form-label">Re-enter Password: </label>
              <input 
                id="reenterPassword"
                type="password" 
                value={reenterPassword} 
                onChange={(e) => setReenterPassword(e.target.value)} 
                className="form-input"
              />
            </div>
            <button className="password-btn" onClick={handlePasswordChange}>
              Change Password
            </button>
          </Card>

          {/* Contact Info Card */}
          <Card className="contact-card">
            <div className="contact-info">
              <h3>Contact Info</h3>
              <p className='pp11'><span className='sp-11'>Address:</span>{employeeDetails.Adress || 'N/A'}</p>
              <p className='pp11'><span className='sp-11'>Email:</span>{employeeDetails.WorkEmail || 'N/A'}</p>
              <p className='pp11'><span className='sp-11'>Phone:</span>{employeeDetails.phone || 'N/A'}</p>
            </div>
          </Card>
        </div>
      )}

      {section === "designation" && (
        <Card>
          <div className="profile-section">
            <table className="exit-details-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Emp ID</th>
                  <th>Full Name</th>
                  <th>Last Name</th>
                  <th>Start Date</th>
                  <th>Tenure</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="profile-icon1" aria-hidden="true">👤</span></td>
                  <td>{employeeDetails.EmployeeID || 'N/A'}</td>
                  <td>{employeeDetails.firstname|| 'N/A'}</td>
                  <td>{employeeDetails.lastname || 'N/A'}</td>
                  <td>{employeeDetails.startdate|| 'N/A'}</td>
                  <td>{employeeDetails.tenure}</td>
                  <td style={{ color: 'green' }}><FaCheckCircle /> Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {section === "exitdetails" && (
        <Card>
          <div className="profile-section">
            <table className="exit-details-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>LWD</th>
                  <th>Exit Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="profile-icon1" aria-hidden="true">👤</span></td>
                  <td>{employeeDetails.EmployeeID || 'N/A'}</td>
                  <td>{employeeDetails.FullName || 'N/A'}</td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {section === "organizationchart" && (
        <Card>
          <div className="company-chart">
            <h3>Organizational Chart</h3>
            <p>CEO</p>
            <div className="horizontal-card-layout">
              <div>CTO</div>
              <div>COO</div>
              <div>CFO</div>
            </div>
            <div className="horizontal-card-layout">
              <div>Engineering</div>
              <div>Operations</div>
              <div>Finance</div>
            </div>
          </div>
        </Card>
      )}
    </main>
  );
}

function Card({ children, className }) {
  return (
    <div className={`card-item ${className || ''}`}>
      {children}
    </div>
  );
}

export default EmployeePage;