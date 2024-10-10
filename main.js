const apiUrl = 'http://localhost:3000/api/users';
const userForm = document.getElementById('user-form');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const userTableBody = document.getElementById('user-table-body');

function fetchUsers() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(users => {
      userTableBody.innerHTML = '';
      users.forEach(user => addUserRow(user));
    });
}
function addUserRow(user) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.age}</td>
    <td>
      <button onclick="editUser('${user.id}')">Edit</button>
      <button onclick="deleteUser('${user.id}')">Delete</button>
    </td>
  `;
  userTableBody.appendChild(row);
}

userForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = userIdInput.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      age: ageInput.value
    })
  }).then(() => {
    userForm.reset();
    fetchUsers();
  });
});

function editUser(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(user => {
      userIdInput.value = user.id;
      nameInput.value = user.name;
      emailInput.value = user.email;
      ageInput.value = user.age;
    });
}

function deleteUser(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' }).then(() => {
    fetchUsers();
  });
}

fetchUsers();