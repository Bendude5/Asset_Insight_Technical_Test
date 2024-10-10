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


userForm.addEventListener('submit', function () {

});

function deleteUser(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' }).then(() => {
    fetchUsers();
  });
}

fetchUsers();