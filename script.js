// Event listener to handle income form submission
document.getElementById('add-income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('income-name').value;
    const amount = document.getElementById('income-amount').value;
    addIncome(name, amount); // Call addIncome function
});

// Event listener to handle expense form submission
document.getElementById('add-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    addExpense(name, amount); // Call addExpense function
});

// Function to add income to the list and delete button functionality
function addIncome(name, amount) {
    const incomeList = document.getElementById('income-list');
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name}, Amount: £${amount} <button class="delete-button">Delete</button>`;
    incomeList.appendChild(li);
    li.querySelector('.delete-button').addEventListener('click', function() {
        incomeList.removeChild(li); // Remove list item on delete button click
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
    });
}
