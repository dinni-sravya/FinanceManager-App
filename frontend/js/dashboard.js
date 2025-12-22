// Store all expenses
let expenses = [];

// Get form
const expenseForm = document.getElementById("expenseForm");

// Listen for submit
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop refresh  page


  // Read inputs
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;

  // Create expense object
  const expense = {
    title: title,
    amount: amount
  };

  // Add to array
  expenses.push(expense);

  // Show expenses
  displayExpenses();

  // Clear inputs
  expenseForm.reset();
});

// Display expenses on screen
function displayExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    const li = document.createElement("li");
    li.textContent = expenses[i].title + " - ₹" + expenses[i].amount;
    list.appendChild(li);
  }
}
