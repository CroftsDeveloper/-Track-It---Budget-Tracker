(function () {
    // Updated mapping between currency codes and symbols
    const currencySymbols = {
        'GBP': '£',
        'EUR': '€',
        'USD': '$',
        'JPY': '¥',
        'AUD': 'A$',
        'CAD': 'C$',
        'CHF': 'CHF',
        'CNY': '¥',
        'SEK': 'kr',
        'NZD': 'NZ$'
    };

    // Event listener for income form submission
    document.getElementById('income-form').addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmission('income');
    });

    // Event listener for expense form submission
    document.getElementById('expense-form').addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmission('expense');
    });

    function handleFormSubmission(type) {
        const description = document.getElementById(`${type}-description`).value;
        const amount = parseFloat(document.getElementById(`${type}-amount`).value);
        type === 'income' ? addIncome(description, amount) : addExpense(description, amount);
        calculateTotal();
        document.getElementById(`${type}-form`).reset();  // Clear the input fields
        saveToLocalStorage();
    }

    // Function to add income
    function addIncome(description, amount) {
        const incomeList = document.getElementById('income-list');
        const li = createListItem(description, amount, 'income');
        incomeList.appendChild(li);
    }

    // Function to add expense
    function addExpense(description, amount) {
        const expenseList = document.getElementById('expense-list');
        const li = createListItem(description, amount, 'expense');
        expenseList.appendChild(li);
    }

    // Function to create list item
    function createListItem(description, amount, type) {
        const li = document.createElement('li');
        li.dataset.type = type;
        li.dataset.amount = amount;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'description';
        descriptionDiv.textContent = description;

        const amountDiv = document.createElement('div');
        amountDiv.className = 'amount';
        amountDiv.textContent = formatCurrency(amount);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const editButton = createActionButton('Edit', function () {
            editItem(li, descriptionDiv, amountDiv, type);
        }, 'Edit item');
        
        const deleteButton = createActionButton('Delete', function () {
            li.remove();
            document.getElementById(`${type}-form`).reset();  // Clear the input fields after delete
            calculateTotal();
            saveToLocalStorage();
        }, 'Delete item');

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);

        li.appendChild(descriptionDiv);
        li.appendChild(amountDiv);
        li.appendChild(actionsDiv);

        return li;
    }

    // Function to create action button
    function createActionButton(text, onClick, ariaLabel) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        button.setAttribute('aria-label', ariaLabel);
        return button;
    }

    // Function to edit list item
    function editItem(listItem, descriptionDiv, amountDiv, type) {
        const form = document.getElementById(`${type}-form`);
        const descriptionInput = form.querySelector(`#${type}-description`);
        const amountInput = form.querySelector(`#${type}-amount`);
        const addButton = form.querySelector('.add-btn');
        const updateButton = form.querySelector('.update-btn');

        descriptionInput.value = descriptionDiv.textContent;
        amountInput.value = parseFloat(amountDiv.textContent.substring(1));

        addButton.hidden = true;
        updateButton.hidden = false;

        updateButton.onclick = function () {
            if (descriptionInput.value !== '' && amountInput.value !== '') {
                const newAmount = parseFloat(amountInput.value);
                descriptionDiv.textContent = descriptionInput.value;
                amountDiv.textContent = formatCurrency(newAmount);
                listItem.dataset.amount = newAmount;
                calculateTotal();
                saveToLocalStorage();

                form.reset();
                addButton.hidden = false;
                updateButton.hidden = true;
            }
        };
    }
    
    // Function to format currency
    function formatCurrency(amount) {
        const currencySelect = document.getElementById('currency');
        const selectedOption = currencySelect.options[currencySelect.selectedIndex];
        const currencyCode = selectedOption.value || 'GBP'; // Default to GBP if not set
        const currencySymbol = currencySymbols[currencyCode];
        return currencySymbol + amount.toFixed(2);
    }

    // Function to calculate total income, expenses, and balance
    function calculateTotal() {
        const incomeListItems = document.querySelectorAll('#income-list li');
        const expenseListItems = document.querySelectorAll('#expense-list li');

        let totalIncome = 0;
        let totalExpenses = 0;

        incomeListItems.forEach((item) => {
            totalIncome += parseFloat(item.dataset.amount);
        });

        expenseListItems.forEach((item) => {
            totalExpenses += parseFloat(item.dataset.amount);
        });

        const balance = totalIncome - totalExpenses;
        const balanceElement = document.getElementById('balance');
        balanceElement.textContent = formatCurrency(balance);

        if (balance < 0) {
            balanceElement.style.color = 'red';
        } else {
            balanceElement.style.color = 'inherit';
        }

        document.getElementById('total-income').textContent = formatCurrency(totalIncome);
        document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    }

    // Function to save to local storage
    function saveToLocalStorage() {
        const incomeData = [];
        document.querySelectorAll('#income-list li').forEach((li) => {
            incomeData.push({ description: li.querySelector('.description').textContent, amount: li.dataset.amount });
        });
        const expenseData = [];
        document.querySelectorAll('#expense-list li').forEach((li) => {
            expenseData.push({ description: li.querySelector('.description').textContent, amount: li.dataset.amount });
        });
        localStorage.setItem('income', JSON.stringify(incomeData));
        localStorage.setItem('expenses', JSON.stringify(expenseData));
    }

    // Function to load from local storage
    function loadFromLocalStorage() {
        const incomeData = JSON.parse(localStorage.getItem('income'));
        const expenseData = JSON.parse(localStorage.getItem('expenses'));
        if (incomeData) {
            incomeData.forEach((item) => {
                addIncome(item.description, parseFloat(item.amount));
            });
        }
        if (expenseData) {
            expenseData.forEach((item) => {
                addExpense(item.description, parseFloat(item.amount));
            });
        }
        calculateTotal();
    }

    // Event listener for currency change
    document.getElementById('currency').addEventListener('change', calculateTotal);

    // Event listener for reset tracker button
    document.getElementById('reset-tracker').addEventListener('click', function () {
        const confirmation = confirm('Are you sure you want to reset the tracker? This action cannot be undone.');
        if (confirmation) {
            document.getElementById('income-list').innerHTML = '';
            document.getElementById('expense-list').innerHTML = '';
            localStorage.removeItem('income');
            localStorage.removeItem('expenses');
            calculateTotal();
        }
    });

    // Load data from local storage on page load
    loadFromLocalStorage();
})();
