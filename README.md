# Spender - Personal Finance Dashboard

A modern, responsive personal finance tracking dashboard built with vanilla JavaScript. Track your spending, manage accounts, transfer funds, and monitor your budget all in one place.

## Features

### Dashboard
- **Balance Overview** - View total balance, income, and expenses at a glance
- **Spending Visualization** - Interactive doughnut chart showing spending by category
- **Category Breakdown** - Detailed breakdown with amounts and percentages
- **Monthly Trends** - Line chart tracking spending patterns over time
- **Quick Stats** - Top category, daily average, and transaction count
- **Recent Transactions** - Quick view of latest transactions

### Accounts
- Multiple account support (Checking, Savings, Investment)
- Visual account icons and balance display

### Transactions
- Full transaction history with category filtering
- Date range filtering
- Search and sort capabilities

### Transfer
- Send money between accounts
- Quick transfer to saved contacts
- Success confirmation modal

### Budget
- Category-based budget tracking
- Visual progress bars showing spending vs. limits
- Warning indicators for over-budget categories

### Settings
- **General Preferences** - Currency and language selection
- **Notifications** - Push notifications and budget alerts toggles
- **Security** - Two-factor authentication option
- Persistent settings via localStorage

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **JavaScript** - Vanilla JS with Chart.js for data visualization
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Open `index.html` in your browser

No build step or server required - the app runs directly in the browser.

## Project Structure

```
spender/
├── index.html      # Main HTML file
├── app.js          # Application JavaScript
├── styles.css      # All styles
└── README.md       # This file
```

## Customization

### Adding Transactions
Edit the `transactions` array in `app.js`:
```javascript
const transactions = [
    { id: 1, name: 'Grocery Store', category: 'food', amount: -156.80, date: '2024-03-18', icon: 'food' },
    // Add more transactions...
];
```

### Adding Contacts
Edit the `contacts` array in `app.js`:
```javascript
const contacts = [
    { id: 1, name: 'Alice Smith', initials: 'AS' },
    // Add more contacts...
];
```

### Supported Categories
- `food` - Food & Dining
- `shopping` - Shopping
- `transport` - Transportation
- `bills` - Bills & Utilities
- `entertainment` - Entertainment
- `income` - Income/Deposits

### Currency Options
- USD ($)
- EUR (€)
- GBP (£)
- JPY (¥)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
