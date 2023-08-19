// Function to create a new income or expense item
function createListItem(type, description, amount) {
    // Create a new div for the list item
    const listItem = document.createElement('div');
    
    // Create divs for the description and amount
    const descriptionDiv = document.createElement('div');
    const amountDiv = document.createElement('div'); 

 // Assign the description and amount to the respective divs
    descriptionDiv.innerText = description;
    amountDiv.innerText = amount;

// Create an edit button
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'edit-button';

// Append the description, amount, and edit button to the list item
    listItem.appendChild(descriptionDiv);
    listItem.appendChild(amountDiv);
    listItem.appendChild(editButton);

// Append the list item to the appropriate section
    if (type === 'income') {
        document.getElementById('income-list').appendChild(listItem);
    } else {
        document.getElementById('expenses-list').appendChild(listItem);
    }
}

// Event listener for the "Add Income" button
document.getElementById('add-income').addEventListener('click', () => {
    createListItem('income', 'Salary', '£2000');
});

// Event listener for the "Add Expense" button
document.getElementById('add-expense').addEventListener('click', () => {
    createListItem('expense', 'Groceries', '£100');
});
