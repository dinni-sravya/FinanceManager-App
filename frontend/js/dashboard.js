let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let balance = 0;

const balanceEl = document.getElementById("balance");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

/* Load saved data */
renderExpenses();

/* Add Expense */
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);

  const expense = {
    id: Date.now(),
    title: title,
    amount: amount,
    date: new Date().toLocaleDateString()
  };

  expenses.push(expense);
  saveData();
  renderExpenses();

  expenseForm.reset();
});

/* Render expenses */
function renderExpenses() {
  expenseList.innerHTML = "";
  balance = 0;

  expenses.forEach(exp => {
    balance -= exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exp.title} - ₹${exp.amount} <small>(${exp.date})</small></span>
      <button onclick="deleteExpense(${exp.id})">❌</button>
    `;

    expenseList.appendChild(li);
  });

  balanceEl.innerText = `₹${balance}`;
}

/* Delete expense */
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveData();
  renderExpenses();
}

/* Save to localStorage */
function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
