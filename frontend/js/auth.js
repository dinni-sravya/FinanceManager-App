const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// REGISTER
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) return;

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// LOGIN
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register.");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
}
