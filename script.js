// Event listener to handle income form submission
document.getElementById('add-income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('income-name').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    addIncome(name, amount);
    updateSummary();
});

// Event listener to handle expense form submission
document.getElementById('add-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    addExpense(name, amount);
    updateSummary();
});

// Function to add income
function addIncome(name, amount) {
    const incomeList = document.getElementById('income-list');
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name}, Amount: ${formatCurrency(amount)} <button class="delete-button">Delete</button>`;
    incomeList.appendChild(li);
    li.querySelector('.delete-button').addEventListener('click', function() {
        incomeList.removeChild(li);
        updateSummary();
    });
}

// Function to add expense
function addExpense(name, amount) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name}, Amount: ${formatCurrency(amount)} <button class="delete-button">Delete</button>`;
    expenseList.appendChild(li);
    li.querySelector('.delete-button').addEventListener('click', function() {
        expenseList.removeChild(li);
        updateSummary();
    });
}

// Function to format currency
function formatCurrency(amount) {
    const currencySymbol = document.getElementById('currency').value;
    return `${currencySymbol}${amount.toFixed(2)}`;
}

// Function to update summary
function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    document.querySelectorAll('#income-list li').forEach(item => {
        totalIncome += parseFloat(item.textContent.split(' ')[3].substring(1));
    });

    document.querySelectorAll('#expense-list li').forEach(item => {
        totalExpenses += parseFloat(item.textContent.split(' ')[3].substring(1));
    });

    const balance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('balance').textContent = formatCurrency(balance);
}

// Event listener for currency selection
document.getElementById('currency').addEventListener('change', updateSummary);

// Event listener for "Delete All" button
document.getElementById('delete-all-btn').addEventListener('click', function() {
    const confirmation = confirm('Are you sure you want to delete all income and expenses? This action cannot be undone.');
    if (confirmation) {
        // Clear income and expense lists
        document.getElementById('income-list').innerHTML = '';
        document.getElementById('expense-list').innerHTML = '';
        // Clear input fields
        document.getElementById('income-name').value = '';
        document.getElementById('income-amount').value = '';
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        // Update summary
        updateSummary();
    }
});
