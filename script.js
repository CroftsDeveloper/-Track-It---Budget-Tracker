// Event listener to handle income form submission
document.getElementById('add-income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('income-name').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    addIncome(name, amount); // Call addIncome function
    updateSummary(); // Update the summary
});

// Event listener to handle expense form submission
document.getElementById('add-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    addExpense(name, amount); // Call addExpense function
    updateSummary(); // Update the summary
});

// Function to add income to the list and delete button functionality
function addIncome(name, amount) {
    const incomeList = document.getElementById('income-list');
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name}, Amount: £${amount} <button class="delete-button">Delete</button>`;
    incomeList.appendChild(li);
    li.querySelector('.delete-button').addEventListener('click', function() {
        incomeList.removeChild(li); // Remove list item on delete button click
        updateSummary(); // Update the summary
    });
}

// Function to add expense to the list and delete button functionality
function addExpense(name, amount) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name}, Amount: £${amount} <button class="delete-button">Delete</button>`;
    expenseList.appendChild(li);
    li.querySelector('.delete-button').addEventListener('click', function() {
        expenseList.removeChild(li); // Remove list item on delete button click
        updateSummary(); // Update the summary
    });
}

// Function to update the summary section with total income, expenses, and balance
function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    // Calculate total income
    document.querySelectorAll('#income-list li').forEach(item => {
        totalIncome += parseFloat(item.textContent.split(' ')[3].substring(1));
    });

    // Calculate total expenses
    document.querySelectorAll('#expense-list li').forEach(item => {
        totalExpenses += parseFloat(item.textContent.split(' ')[3].substring(1));
    });

    // Calculate balance
    const balance = totalIncome - totalExpenses;

    // Update the summary section
    document.getElementById('total-income').textContent = `£${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `£${totalExpenses.toFixed(2)}`;
    document.getElementById('balance').textContent = `£${balance.toFixed(2)}`;
}
