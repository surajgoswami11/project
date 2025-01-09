import React from "react";
import axios from "axios";

const EmployeeList = ({ employees, fetchEmployees, setEditingEmployee }) => {
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/delete/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <p>
              <strong>
                {employee.firstName} {employee.lastName}
              </strong>
              <br />
              Email: {employee.email}
              <br />
              Phone: {employee.phone}
              <br />
              Address: {employee.address}
            </p>
            <button onClick={() => setEditingEmployee(employee)}>Edit</button>
            <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
