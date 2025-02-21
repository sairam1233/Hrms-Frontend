import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    department: "",
    position: "",
    startDate: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    image: null,
    gender: "",
    about: null,
  });

  const departmentPositions = {
    Manager: ["HR Manager", "Project Manager"],
    Employee: ["Frontend Developer", "Backend Developer", "Web Developer Intern"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };

      if (name === "firstName" || name === "lastName") {
        updatedData.fullname = `${updatedData.firstName} ${updatedData.lastName}`.trim();
      }

      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("https://your-api-endpoint.com/employees", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted:", response.data);
      alert("Employee registered successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to register employee.");
    }
  };

  return (
    <div className="add-employee-container">
      <div className="add-employee-form-container">
        <h1>Employee Registration</h1>
        <form onSubmit={handleSubmit} className="add-employee-form">
          {/* Personal Information */}
          <fieldset className="add-employee-fieldset">
            <legend className="add-employee-legend">Personal Information</legend>
            <div className="add-employee-input-row">
              <div className="add-employee-input-group">
                <label className="add-employee-label">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  className="add-employee-input"
                  readOnly
                />
                <label className="add-employee-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="add-employee-input"
                  required
                />
              </div>
              <div className="add-employee-input-group">
                <label className="add-employee-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="add-employee-input"
                  required
                />
              </div>
            </div>
            <div className="add-employee-input-row">
              <div className="add-employee-input-group">
                <label className="add-employee-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="add-employee-input"
                  required
                />
              </div>
              <div className="add-employee-input-group">
                <label className="add-employee-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="add-employee-input"
                  required
                />
              </div>
            </div>
            <div className="add-employee-input-group">
              <label className="add-employee-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="add-employee-input"
                required
              />
            </div>

            <label>Gender</label>
              <div className="gender-options">
                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
                <input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} /> Other
              </div>

            {/* Image Upload */}
            <div className="add-employee-input-group">
              <label className="add-employee-label">Profile Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="add-employee-input"
              />
            </div>
          </fieldset>

          {/* Employment Details */}
          <fieldset className="add-employee-fieldset">
            <legend className="add-employee-legend">Employment Details</legend>
            <div className="add-employee-input-row">
              <div className="add-employee-input-group">
                <label className="add-employee-label">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="add-employee-select"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>
            <div className="add-employee-input-group">
              <label className="add-employee-label">Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="add-employee-select"
                required
              >
                <option value="">Select Position</option>
                {formData.department &&
                  departmentPositions[formData.department].map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
              </select>
            </div>
            <div className="add-employee-input-group">
              <label className="add-employee-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="add-employee-input"
                required
              />
            </div>
          </fieldset>

          {/* Address Information */}
          <fieldset className="add-employee-fieldset">
            <legend className="add-employee-legend">Address Information</legend>
            <div className="add-employee-input-group">
              <label className="add-employee-label">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="add-employee-input"
                required
              />
            </div>
            <div className="add-employee-input-row">
              <div className="add-employee-input-group">
                <label className="add-employee-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="add-employee-input"
                  required
                />
              </div>
              <div className="add-employee-input-group">
                <label className="add-employee-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="add-employee-input"
                  required
                />
              </div>
            </div>
            <div className="add-employee-input-group">
              <label className="add-employee-label">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="add-employee-input"
                required
              />
            </div>
          </fieldset>

          <button type="submit" className="add-employee-submit-btn">
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
