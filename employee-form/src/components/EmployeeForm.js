import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeForm = ({
  fetchEmployees,
  editingEmployee,
  setEditingEmployee,
}) => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee._id) {
        await axios.put(
          `http://localhost:5000/update/${employee._id}`,
          employee
        );
      } else {
        await axios.post("http://localhost:5000/employee", employee);
      }
      fetchEmployees();
      setEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      });
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={employee.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={employee.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <textarea
        name="address"
        value={employee.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <button type="submit">{employee._id ? "Update" : "Add"} Employee</button>
    </form>
  );
};

export default EmployeeForm;
