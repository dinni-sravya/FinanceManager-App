// Get form element
const loginForm = document.getElementById("loginForm");

// Listen for submit event
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page refresh

  // Read input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simple validation
  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  // Temporary success message
  alert("Login successful (frontend only)");

  // Print values (for learning)
  console.log("Email:", email);
  console.log("Password:", password);
});
