const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json()); // Parse incoming JSON requests

const filePath = './data/users.json'; // File to store users

// Helper to read JSON file
function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Helper to write JSON file
function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Get all users
app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Create a new user
app.post('/api/users', (req, res) => {
  const users = readUsers();
  const newUser = { id: Date.now().toString(), ...req.body }; // Simple ID generator
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    writeUsers(users);
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  let users = readUsers();
  users = users.filter(u => u.id !== req.params.id);
  writeUsers(users);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});