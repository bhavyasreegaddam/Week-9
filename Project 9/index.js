//Empolyee Management API
const express = require('express');
const app = express();
const port = 3000;

let employees = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

app.use(express.json());

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Get a single employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(e => e.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Add a new employee
app.post('/employees', (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(e => e.id === id);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    res.json(employees[employeeIndex]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(e => e.id === id);
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
