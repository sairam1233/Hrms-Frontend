import { FaPlus } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./ListEmployee.css";
import { FaCircleInfo} from 'react-icons/fa6';

const ListEmployee = () => {
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterDesignation, setFilterDesignation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("token");
                const response = await fetch("http://localhost:5000/listemployee", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTableData(data.data || []);
                    console.log("Data fetched successfully:", data.data);
                } else {
                    console.error("Error fetching data:", response.status);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Error 404: Data not found");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, []);

    const addEmployee = () => {
        navigate("/addemployee");
    };

    const viewEmployee = (employeeID) => {
        navigate(`/overviewemployee/${employeeID}`);
    };

    const filteredData = tableData.filter(
        (employee) =>
            employee.FullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterRole === "" || employee.Role === filterRole) &&
            (filterDesignation === "" || employee.designation === filterDesignation)
    );

    return (
        <div className="container-list-employee">
                    <div className="ribbon-box">
                        <div className="ribbon ribbon-info float-left">Employee list</div>
                    </div>
            <div className="header d-flex align-items-center justify-content-between">
                <Nav className="flex-grow-1">
                    <div className="search-bar-container">
                        <select className="role-filter" onChange={(e) => setFilterRole(e.target.value)}>
                            <option value="">All</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Project Manager">Project Manager</option>
                        </select>
                        <input
                            className="form-control search-bar"
                            type="search"
                            placeholder="Search Employee"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </Nav>
                <div className="header-buttons">
                    <button className="add-button" onClick={addEmployee}>
                        <FaPlus /> Add Employee
                    </button>
                </div>
            </div>

            <table className="table-auto border-collapse border border-gray-300 w-full mt-3">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">EmployeeID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Designation</th>
                        <th className="border border-gray-300 px-4 py-2">More</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{row.EmployeeID}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.FullName}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.WorkEmail}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.Role}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.designation}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <FaCircleInfo style={{ cursor: "pointer" }} onClick={() => viewEmployee(row.EmployeeID)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    );
};

export default ListEmployee;
