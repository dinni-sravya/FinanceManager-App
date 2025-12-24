// ===== GET HTML ELEMENTS =====
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");
const balanceEl = document.getElementById("balance");

// ===== LOAD FROM LOCAL STORAGE =====
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ===== ADD EXPENSE =====
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value;
  const amount = Number(amountInput.value);

  const expense = {
    id: Date.now(),
    title: title,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
  expenseForm.reset();
});

// ===== RENDER EXPENSES =====
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    expenseList.appendChild(li);
  });

  updateBalance();
}

// ===== DELETE EXPENSE =====
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// ===== UPDATE BALANCE =====
function updateBalance() {
  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;
  });

  balanceEl.textContent = "₹" + total;
}

// ===== INITIAL LOAD =====
renderExpenses();
