// Financial App JavaScript

// Transaction Data
const transactions = [
    { id: 1, name: 'Grocery Store', category: 'food', amount: -156.80, date: '2024-03-18', icon: 'food' },
    { id: 2, name: 'Salary Deposit', category: 'income', amount: 4500.00, date: '2024-03-15', icon: 'income' },
    { id: 3, name: 'Amazon Purchase', category: 'shopping', amount: -89.99, date: '2024-03-14', icon: 'shopping' },
    { id: 4, name: 'Uber Ride', category: 'transport', amount: -24.50, date: '2024-03-13', icon: 'transport' },
    { id: 5, name: 'Electric Bill', category: 'bills', amount: -145.00, date: '2024-03-12', icon: 'bills' },
    { id: 6, name: 'Netflix Subscription', category: 'entertainment', amount: -15.99, date: '2024-03-10', icon: 'entertainment' },
    { id: 7, name: 'Restaurant Dinner', category: 'food', amount: -78.50, date: '2024-03-09', icon: 'food' },
    { id: 8, name: 'Freelance Payment', category: 'income', amount: 1200.00, date: '2024-03-08', icon: 'income' },
];

// Quick Transfer Contacts
const contacts = [
    { id: 1, name: 'Alice Smith', initials: 'AS' },
    { id: 2, name: 'Bob Johnson', initials: 'BJ' },
    { id: 3, name: 'Carol Williams', initials: 'CW' },
    { id: 4, name: 'David Brown', initials: 'DB' },
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initDate();
    initNavigation();
    initTransactions();
    initQuickContacts();
    initChart();
    initTransferForm();
    initFilters();
    initSettings();
});

// Set Current Date
function initDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('page-title');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Get page name
            const page = item.dataset.page;
            
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(`page-${page}`).classList.add('active');
            
            // Update title
            const titles = {
                dashboard: 'Dashboard',
                accounts: 'Accounts',
                transactions: 'Transactions',
                transfer: 'Transfer',
                budget: 'Budget',
                settings: 'Settings'
            };
            pageTitle.textContent = titles[page] || 'Dashboard';
            
            // Reinitialize chart if going to dashboard
            if (page === 'dashboard') {
                initChart();
            }
        });
    });
} 

// Initialize Transactions
function initTransactions() {
    const recentContainer = document.getElementById('recent-transactions');
    const allContainer = document.getElementById('all-transactions');
    
    // Show recent transactions (first 5)
    const recentTransactions = transactions.slice(0, 5);
    recentContainer.innerHTML = recentTransactions.map(t => createTransactionHTML(t)).join('');
    
    // Show all transactions
    allContainer.innerHTML = transactions.map(t => createTransactionHTML(t)).join('');
}

// Create Transaction HTML
function createTransactionHTML(transaction) {
    const amountClass = transaction.amount > 0 ? 'positive' : 'negative';
    const amountPrefix = transaction.amount > 0 ? '+' : '';
    const dateFormatted = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `
        <div class="transaction-item">
            <div class="transaction-icon ${transaction.icon}">
                <i class="fas fa-${getCategoryIcon(transaction.icon)}"></i>
            </div>
            <div class="transaction-details">
                <span class="transaction-name">${transaction.name}</span>
                <span class="transaction-date">${dateFormatted}</span>
            </div>
            <span class="transaction-amount ${amountClass}">${amountPrefix}$${Math.abs(transaction.amount).toFixed(2)}</span>
        </div>
    `;
}

// Get Category Icon
function getCategoryIcon(category) {
    const icons = {
        food: 'utensils',
        shopping: 'shopping-bag',
        transport: 'car',
        bills: 'file-invoice-dollar',
        entertainment: 'film',
        income: 'arrow-down'
    };
    return icons[category] || 'circle';
}

// Initialize Quick Contacts
function initQuickContacts() {
    const container = document.getElementById('quick-contacts');
    container.innerHTML = contacts.map(contact => `
        <div class="quick-contact" data-id="${contact.id}" data-name="${contact.name}">
            <div class="quick-avatar">${contact.initials}</div>
            <span class="quick-name">${contact.name}</span>
        </div>
    `).join('');
    
    // Add click handlers for quick transfer
    container.querySelectorAll('.quick-contact').forEach(contact => {
        contact.addEventListener('click', () => {
            const name = contact.dataset.name;
            document.getElementById('to-account').value = `****${Math.floor(1000 + Math.random() * 9000)}`;
            // Switch to transfer page
            document.querySelector('[data-page="transfer"]').click();
        });
    });
}

// Initialize Chart
function initChart() {
    const canvas = document.getElementById('spendingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if any
    if (window.spendingChart) {
        window.spendingChart.destroy();
    }
    
    const spendingData = {
        food: 235.80,
        shopping: 180.99,
        transport: 75.50,
        bills: 145.00,
        entertainment: 80.99
    };
    
    const colors = ['#ef4444', '#a855f7', '#3b82f6', '#f59e0b', '#10b981'];
    const labels = Object.keys(spendingData);
    const data = Object.values(spendingData);
    const total = data.reduce((a, b) => a + b, 0);
    
    window.spendingChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
    
    // Populate spending breakdown
    populateSpendingBreakdown(spendingData, colors, total);
    
    // Initialize trend chart
    initTrendChart();
}

// Populate Spending Breakdown
function populateSpendingBreakdown(spendingData, colors, total) {
    const container = document.getElementById('spending-breakdown');
    if (!container) return;
    
    const entries = Object.entries(spendingData).sort((a, b) => b[1] - a[1]);
    const colorMap = {
        food: '#ef4444',
        shopping: '#a855f7',
        transport: '#3b82f6',
        bills: '#f59e0b',
        entertainment: '#10b981'
    };
    
    container.innerHTML = entries.map(([category, amount]) => {
        const percentage = ((amount / total) * 100).toFixed(1);
        return `
            <div class="breakdown-item">
                <div class="breakdown-info">
                    <span class="breakdown-dot" style="background: ${colorMap[category]}"></span>
                    <span class="breakdown-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
                <div class="breakdown-values">
                    <span class="breakdown-amount">$${amount.toFixed(2)}</span>
                    <span class="breakdown-percent">${percentage}%</span>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize Trend Chart
function initTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (window.trendChart) {
        window.trendChart.destroy();
    }
    
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Spending',
                data: [420, 380, 510, 290],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e5e7eb'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize Transfer Form
function initTransferForm() {
    const form = document.getElementById('transfer-form');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-modal');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fromAccount = document.getElementById('from-account');
        const toAccount = document.getElementById('to-account');
        const amount = document.getElementById('amount');
        const note = document.getElementById('transfer-note');
        
        // Validate
        if (!toAccount.value || !amount.value || parseFloat(amount.value) <= 0) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show success modal
        const accountName = fromAccount.options[fromAccount.selectedIndex].text.split(' - ')[0];
        document.getElementById('transfer-details').textContent = 
            `You have successfully transferred $${parseFloat(amount.value).toFixed(2)} from ${accountName} to account ${toAccount.value}`;
        
        modal.classList.add('active');
        
        // Reset form
        form.reset();
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize Filters
function initFilters() {
    const applyBtn = document.getElementById('apply-filters');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const category = document.getElementById('filter-category').value;
            const startDate = document.getElementById('filter-date-start').value;
            const endDate = document.getElementById('filter-date-end').value;
            
            let filtered = [...transactions];
            
            if (category) {
                filtered = filtered.filter(t => t.category === category);
            }
            
            if (startDate) {
                filtered = filtered.filter(t => t.date >= startDate);
            }
            
            if (endDate) {
                filtered = filtered.filter(t => t.date <= endDate);
            }
            
            const container = document.getElementById('all-transactions');
            container.innerHTML = filtered.length > 0 
                ? filtered.map(t => createTransactionHTML(t)).join('')
                : '<p style="text-align: center; color: #6b7280; padding: 2rem;">No transactions found</p>';
        });
    }
}

// Initialize Settings
function initSettings() {
    loadSettings();
    
    const saveBtn = document.getElementById('save-settings');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveSettings);
    }
}

// Load Settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('finflow-settings')) || {
        currency: 'USD',
        language: 'en-US',
        notifications: true,
        budgetAlerts: true,
        twoFactorAuth: false
    };
    
    document.getElementById('setting-currency').value = settings.currency;
    document.getElementById('setting-language').value = settings.language;
    document.getElementById('setting-notifications').checked = settings.notifications;
    document.getElementById('setting-budget-alerts').checked = settings.budgetAlerts;
    document.getElementById('setting-2fa').checked = settings.twoFactorAuth;
}

// Save Settings to localStorage
function saveSettings() {
    const settings = {
        currency: document.getElementById('setting-currency').value,
        language: document.getElementById('setting-language').value,
        notifications: document.getElementById('setting-notifications').checked,
        budgetAlerts: document.getElementById('setting-budget-alerts').checked,
        twoFactorAuth: document.getElementById('setting-2fa').checked
    };
    
    localStorage.setItem('finflow-settings', JSON.stringify(settings));
    
    const modal = document.getElementById('success-modal');
    document.getElementById('transfer-details').textContent = 'Your settings have been saved successfully!';
    modal.classList.add('active');
    
    document.getElementById('close-modal').onclick = () => {
        modal.classList.remove('active');
    };
}

// Export for potential testing
window.FinFlowApp = {
    transactions,
    contacts,
    getTransactions: () => transactions,
    getTotalBalance: () => transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0) + 
                      transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0),
    getTotalIncome: () => transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
    getTotalExpenses: () => Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))
};
