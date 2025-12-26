// 1. GATEKEEPER: Prevent unauthorized access
if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
}

// 2. SELECT ELEMENTS
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category"); // For ADDING
const expenseList = document.getElementById("expenseList");
const balanceEl = document.getElementById("balance");
const totalCountEl = document.getElementById("totalCount");
const clearAllBtn = document.getElementById("clearAll");
const logoutBtn = document.getElementById("logoutBtn");

// Filter Elements
const filterDate = document.getElementById("filterDate");
const filterCategory = document.getElementById("filterCategory"); // For SEARCHING

// 3. LOAD DATA
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// 4. INITIAL RENDER
renderExpenses();

// 5. ADD EXPENSE LOGIC
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newExpense = {
        id: Date.now(),
        title: titleInput.value.trim(),
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: new Date().toISOString().split('T')[0] // Saves as YYYY-MM-DD
    };

    expenses.push(newExpense);
    saveAndRender();
    expenseForm.reset(); // Clears title, amount, and dropdown
});

// 6. RENDER FUNCTION (With Logic for Filters)
function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    const selectedDate = filterDate.value;
    const selectedCat = filterCategory.value;

    // Filter logic
    const filtered = expenses.filter(exp => {
        const dateMatch = !selectedDate || exp.date === selectedDate;
        const catMatch = selectedCat === "All" || exp.category === selectedCat;
        return dateMatch && catMatch;
    });

    filtered.forEach(exp => {
        total += exp.amount;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";

        li.innerHTML = `
            <div>
                <strong>${exp.title}</strong>
                <small style="display:block; color:#777;">${exp.category} • ${exp.date}</small>
            </div>
            <div style="display:flex; align-items:center;">
                <span style="font-weight:bold; color:#059669; margin-right:15px;">₹${exp.amount}</span>
                <button onclick="deleteExpense(${exp.id})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:16px;">✕</button>
            </div>
        `;
        expenseList.appendChild(li);
    });

    // Update Totals
    balanceEl.textContent = `₹${total}`;
    totalCountEl.textContent = filtered.length;
}

// 7. UTILITY FUNCTIONS
function saveAndRender() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
}

window.deleteExpense = function(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveAndRender();
};

clearAllBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to clear all data?")) {
        expenses = [];
        saveAndRender();
    }
});

// 8. FILTER EVENT LISTENERS
// These trigger renderExpenses() every time you change a filter
filterDate.addEventListener("input", renderExpenses);
filterCategory.addEventListener("change", renderExpenses);

// 9. LOGOUT LOGIC
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});