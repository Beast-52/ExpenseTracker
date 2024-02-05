# Expense Tracker App

## Overview
A web app for managing expenses with an interactive UI, responsive design, and local storage.

## Features
1. **User Interface:**
   - Expense form for adding details.
   - List to display and manage expenses.
   - Total balance display.

2. **Responsive Design:**
   - Ensures usability across devices.

3. **Local Storage:**
   - Persists expense data in the browser.

## Design
1. **HTML Structure (index.html):**
   - Expense form, list, and balance display.

2. **CSS Styling (styles.css):**
   - Defines visual styles for responsiveness.

3. **JavaScript Logic (script.js):**
   - Manages dynamic app behavior.

## Local Storage
```javascript
const expenseDataKey = 'expenseData';

function saveExpenseData(data) {
    localStorage.setItem(expenseDataKey, JSON.stringify(data));
}

function getExpenseData() {
    return JSON.parse(localStorage.getItem(expenseDataKey)) || [];
}
