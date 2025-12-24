// ===== GET ELEMENTS =====
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");
const balanceEl = document.getElementById("balance");
const totalCountEl = document.getElementById("totalCount");
const filterDate = document.getElementById("filterDate");
const clearAllBtn = document.getElementById("clearAll");

// ===== LOAD STORAGE =====
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ===== FORM SUBMIT =====
expenseForm.addEventListener("submit", e => {
  e.preventDefault();

  const expense = {
    id: Date.now(),
    title: titleInput.value.trim(),
    amount: Number(amountInput.value),
    date: new Date().toLocaleDateString()
  };

  if (!expense.title || expense.amount <= 0) return;

  expenses.push(expense);
  saveAndRender();
  expenseForm.reset();
});

// ===== SAVE & RENDER =====
function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(expenses);
}

// ===== RENDER =====
function renderExpenses(list) {
  expenseList.innerHTML = "";
  let total = 0;

  list.forEach((exp, index) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.title} - ₹${exp.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    expenseList.appendChild(li);
  });

  balanceEl.textContent = "₹" + total;
  totalCountEl.textContent = list.length;
}

// ===== DELETE =====
function deleteExpense(index) {
  expenses.splice(index, 1);
  saveAndRender();
}

// ===== FILTER BY DATE =====
filterDate.addEventListener("change", () => {
  const selected = new Date(filterDate.value).toLocaleDateString();
  const filtered = expenses.filter(e => e.date === selected);
  renderExpenses(filtered);
});

// ===== CLEAR ALL =====
clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all expenses?")) {
    expenses = [];
    saveAndRender();
  }
});

// ===== INIT =====
renderExpenses(expenses);
