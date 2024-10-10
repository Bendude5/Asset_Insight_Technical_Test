const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json());

const filePath = './data/users.json';
function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const users = readUsers();
  const newUser = { id: Date.now().toString(), ...req.body };
  writeUsers(users);
  res.status(201).json(newUser);
});

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
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});