// REST API
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginBtn = document.getElementById('loginBtn');

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUe10cbd9ad12a2fbaf42c9db799a8960956ada365c1ec3455320c78e8ab11e0f84249da0030538e747e744ff7cd245e7d'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.type === undefined) {
            document.getElementById('message').innerText = 'The username or password is incorrect.';
            return;
        }
        if (data.type !== role) {
            document.getElementById('message').innerText = 'The information is incorrect.';
            return;
        }

        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerText = data.message;

        // จัดเก็บข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem('user', JSON.stringify({
            username: data.displayname_en,
            studentID: data.username,
            email: data.email
        }));

        // ย้ายไปที่หน้า index.html
        window.location.href = 'index.html';
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error: ' + error.message;
    });
}

// =======================================================================================
//Chack
function closedelete() {
    document.getElementById('message').style.color = 'ff0000';
    document.getElementById('Profile').style.display = 'none';
    document.getElementById("loginForm").reset();
    location.reload();
    document.getElementById('message').innerText = '';
}

function checkInputs() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value.trim();
    const loginBtn = document.getElementById('loginBtn');

    if (username !== '' && password !== '' && role !== '') {
        loginBtn.disabled = false; // Enable the button if all fields are filled
    } else {
        loginBtn.disabled = true; // Disable the button if any field is empty
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const roleField = document.getElementById('role');

    if (usernameField) usernameField.addEventListener('input', checkInputs);
    if (passwordField) passwordField.addEventListener('input', checkInputs);
    if (roleField) roleField.addEventListener('change', checkInputs);
});

function toggleDropdown() {
    var dropdown = document.getElementById("dropdown-content");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// =======================================================================================
// Close the dropdown if clicked outside
window.onclick = function(event) {
    const dropdown = document.getElementById("dropdown-content");
    if (dropdown && !event.target.matches('.user-info') && !event.target.closest('.user-info')) {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
};

//logout
function logout() {
    sessionStorage.clear();

    window.location.href = 'login.html';
}