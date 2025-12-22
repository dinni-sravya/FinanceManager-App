// Store all expenses
let expenses = [];

// Get HTML elements
const balanceEl = document.getElementById("balance");
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");

// Initial balance
let balance = 0;

// Form submit event
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title === "" || amount <= 0) {
    alert("Please enter valid details");
    return;
  }

  // Create expense object
  const expense = {
    title: title,
    amount: amount
  };

  expenses.push(expense);
  balance -= amount;

  updateBalance();
  displayExpenses();

  // Clear inputs
  titleInput.value = "";
  amountInput.value = "";
});

// Update balance on UI
function updateBalance() {
  balanceEl.textContent = "₹" + balance;
}

// Display expenses in list
function displayExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(function (expense) {
    const li = document.createElement("li");
    li.textContent = expense.title + " - ₹" + expense.amount;
    expenseList.appendChild(li);
  });
}
