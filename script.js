// Event listener to handle income form submission
document.getElementById('add-income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('income-name').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    addItem('income', name, amount);
    updateSummary();
});

// Event listener to handle expense form submission
document.getElementById('add-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    addItem('expense', name, amount);
    updateSummary();
});

function addItem(type, name, amount) {
    const list = document.getElementById(`${type}-list`);
    const li = createListItem(name, amount);
    list.appendChild(li);
    li.querySelector('.delete-button').addEventListener('click', function() {
        list.removeChild(li);
        updateSummary();
    });
}

function createListItem(name, amount) {
    const li = document.createElement('li');
    li.innerHTML = `Name: ${name}, Amount: <span class="amount">£${amount.toFixed(2)}</span> <button class="delete-button">Delete</button>`;
    return li;
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;
    const currencySymbol = document.getElementById('currency').value;

    // Calculate total income
    document.querySelectorAll('#income-list .amount').forEach(item => {
        totalIncome += parseFloat(item.textContent.substring(1));
    });

    // Calculate total expenses
    document.querySelectorAll('#expense-list .amount').forEach(item => {
        totalExpenses += parseFloat(item.textContent.substring(1));
    });

    const balance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = `${currencySymbol}${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `${currencySymbol}${totalExpenses.toFixed(2)}`;
    document.getElementById('balance').textContent = `${currencySymbol}${balance.toFixed(2)}`;
}

// Event listener for currency selection
document.getElementById('currency').addEventListener('change', updateSummary);
