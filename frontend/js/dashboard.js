// ===============================
// DAY 9 – PERSISTENT EXPENSE LOGIC
// ===============================

// ---- GET HTML ELEMENTS ----
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");
const balanceEl = document.getElementById("balance");

// ---- LOAD EXPENSES FROM LOCAL STORAGE ----
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ---- HANDLE FORM SUBMIT ----
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title === "" || amount <= 0) return;

  const expense = {
    id: Date.now(),
    title: title,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  expenses.push(expense);
  saveAndRender();

  expenseForm.reset();
});

// ---- SAVE TO LOCAL STORAGE + RENDER ----
function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// ---- DISPLAY EXPENSE LIST ----
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${expense.title} - ₹${expense.amount}</span>
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    expenseList.appendChild(li);
  });

  updateBalance();
}

// ---- DELETE EXPENSE ----
function deleteExpense(index) {
  expenses.splice(index, 1);
  saveAndRender();
}

// ---- UPDATE TOTAL BALANCE ----
function updateBalance() {
  let total = 0;

  expenses.forEach(expense => {
    total += expense.amount;
  });

  balanceEl.textContent = "₹" + total;
}

// ---- INITIAL LOAD ----
renderExpenses();
