document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    
    // Add animation to form inputs
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.classList.add('animate-fade-in');
    });

    document.getElementById('expenseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addExpense();
    });
});

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.getElementById('expenseForm');
    form.parentNode.insertBefore(successDiv, form);
    
    successDiv.style.display = 'block';
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 3000);
}

async function loadExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();
        
        const expensesList = document.getElementById('expensesList');
        expensesList.innerHTML = '';
        
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.className = 'expense-row';
            row.style.animationDelay = `${index * 0.1}s`;
            
            row.innerHTML = `
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>
                    <span class="animate-scale-in" style="display: inline-block;">
                        ${expense.amount} ${expense.currency}
                    </span>
                </td>
                <td>
                    <span class="badge bg-primary animate-fade-in">
                        ${expense.category}
                    </span>
                </td>
                <td>${expense.description}</td>
            `;
            expensesList.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading expenses:', error);
    }
}

async function addExpense() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseFloat(amount),
                currency,
                category,
                description
            })
        });

        if (response.ok) {
            // Add success animation
            showSuccessMessage('Expense added successfully!');
            
            // Reset form with animation
            const form = document.getElementById('expenseForm');
            form.classList.add('animate-fade-in');
            form.reset();
            setTimeout(() => form.classList.remove('animate-fade-in'), 500);
            
            // Reload expenses with animation
            loadExpenses();
        } else {
            console.error('Error adding expense');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await fetch(`/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
        const data = await response.json();
        return data.converted_amount;
    } catch (error) {
        console.error('Error converting currency:', error);
        return null;
    }
}

// Add hover animation to table rows
document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    table.addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'TD') {
            const row = e.target.parentElement;
            row.style.transform = 'scale(1.01)';
            row.style.transition = 'transform 0.2s ease';
        }
    });
    
    table.addEventListener('mouseout', function(e) {
        if (e.target.tagName === 'TD') {
            const row = e.target.parentElement;
            row.style.transform = 'scale(1)';
        }
    });
});
