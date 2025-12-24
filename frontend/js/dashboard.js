// Load saved expenses when page loads
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Select required elements
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");
const balanceEl = document.getElementById("balance");

// Show existing expenses
displayExpenses();
updateBalance();

// Handle form submit
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value;
  const amount = Number(amountInput.value);

  const expense = {
    id: Date.now(),
    title: title,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  expenses.push(expense);
  saveExpenses();

  titleInput.value = "";
  amountInput.value = "";
});

// Save expenses
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
  updateBalance();
}

// Display expenses
function displayExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(function (expense) {
    const li = document.createElement("li");
    li.textContent = `${expense.title} - ₹${expense.amount} (${expense.date})`;
    expenseList.appendChild(li);
  });
}

// Update balance
function updateBalance() {
  let total = 0;

  expenses.forEach(function (expense) {
    total += expense.amount;
  });

  balanceEl.textContent = `₹${total}`;
}
