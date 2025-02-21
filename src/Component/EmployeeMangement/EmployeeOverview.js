import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './EmployeeOverview.css'; // Import CSS file for styling
import { FaCircleCheck, FaList, FaUserPen } from 'react-icons/fa6';

const EmployeeOverview = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`http://localhost:5000/employee/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setEmployee(data.data);
                    console.log('Employee fetched successfully:', data.data);
                } else {
                    console.error('Error fetching employee:', response.status);
                }
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    useEffect(() => {
        console.log('Employee state updated:', employee);
    }, [employee]);

    const listEmployee = () => {
        navigate('/manageemployee');
    }

    return (
        <div className="employee-overview-container">
            <h2 className='heading-overview'>Overview of {id}</h2>
            <div className="button-container">
                <button className="edit-button"><FaUserPen className="edit-icon" /> Edit</button>
                <button className="list-button" onClick={listEmployee}><FaList className="edit-icon"/>List</button>
            </div>
            {employee ? (
                <div className="employee-details">

                    <div className="ribbon-box">
                        <div className="ribbon ribbon-info float-left">Basic Details</div>
                    </div>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>EmployeeID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Start Date</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Designation</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{employee.EmployeeID}</td>
                                <td>{employee.FullName}</td>
                                <td>{employee.WorkEmail}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.DateOfBirth}</td>
                                <td>{employee.startdate}</td>
                                <td>{employee.Company}</td>
                                <td>{employee.Role}</td>
                                <td>{employee.designation}</td>
                                <td style={{color:"green"}}><FaCircleCheck/>Active</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="ribbon-box">
                        <div className="ribbon-address ribbon-info float-left">Address Details</div>
                    </div>
                    <table className="employee-table-address">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Postal Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{employee.Address}</td>
                                <td>{employee.City}</td>
                                <td>{employee.State}</td>
                                <td>{employee.Country}</td>
                                <td>{employee.PinCode}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="ribbon-box-attendance-log-activiy">
                <div className="ribbon-info float-left">AttendanceLogs</div>
            </div> 
            <table className="employee-table-attendance-log">
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th>Date</th>
                            <th>Log time</th>
                            <th>EffectiveHours</th>
                            <th>Log Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{}</td>
                            <td>2021-09-15</td>
                            <td>09:00 AM</td>
                            <td>9 hours</td>
                            <td style={{color:"green"}}><FaCircleCheck/>Present</td>
                        </tr>
                    </tbody>
                </table>

    </div>
    );
};

export default EmployeeOverview;