function login() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');


  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value;


  const validUsername = 'boris';
  const validPasswords = ['boris12345.', 'Boris12345.'];


  if (username === validUsername && validPasswords.includes(password)) {
    const loginContainer = document.querySelector('.login-container');
    const infoContainer = document.querySelector('.container');


    loginContainer.classList.add('fade-out');


    setTimeout(() => {
      loginContainer.style.display = 'none';
      infoContainer.style.display = 'block';
      infoContainer.classList.add('fade');
    }, 1000);
  } else {
    alert('greshno ime ili parola.');
  }
}

document.getElementById("username").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    login();
  }
});

document.getElementById("password").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    login();
  }
});