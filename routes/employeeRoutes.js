const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Create
router.post("/employee", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
router.put("/update/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
