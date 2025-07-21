# Personal-Finance-Tracker

# 📘 PersonalFinanceManager_Finance

A modern React-based personal finance manager app to help users track expenses, income, and savings, with features like visual charts, recurring payments, and financial health insights.

---

## 🚀 Features

- 🔐 **User Authentication** (Firebase Auth)
- 💸 **Expense Tracking** by category
- 💰 **Income Tracking** by source
- 📊 **Visual Analytics**: Pie charts for expenses and income
- 🔄 **Recurring Payments** (WIP)
- 🎯 **Savings Goals** tracking
- 🧠 **AI-Powered Budget Tips** (Planned)
- 📈 **Financial Health Score** (Planned)
- 📄 **Data Export/Import** (CSV/PDF, planned)
- 👥 **Split Expenses Between Users** (Basic support)

---

## 🔧 Tech Stack

- **Frontend**: React + Tailwind CSS
- **State Management**: Context API
- **Charts**: `recharts`
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Hosting**: (Firebase Hosting or Vercel suggested)

---

## 🔧 Folder Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx
│   ├── IncomeForm.jsx
│   └── ExpenseChart.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── LoginRegister.jsx
├── firebase/
│   └── config.js
├── App.jsx
└── main.jsx
```

---

## 🔐 Firebase Firestore Structure

```
users/
  {userId}/
    expenses/
      - title, amount, category, notes, createdAt, sharedWith
    income/
      - source, amount, createdAt
    savingsGoals/
      - goalName, targetAmount, savedAmount, dueDate
    recurringPayments/
      - name, amount, frequency, nextDate
```

---

## 🧪 Getting Started Locally

1. **Clone this repo:**

   ```bash
   git clone https://github.com/yourusername/PersonalFinanceManager_Finance.git
   cd PersonalFinanceManager_Finance
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Firebase:**

   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable **Authentication** and **Firestore Database**
   - Replace the Firebase config inside `firebase/config.js`

4. **Run the app:**

   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

- Expense & income forms
- Pie charts of income sources and expenses
- Dashboard with totals
- Auth-protected routes

---

## ✅ To Do

- [x] Expense & income CRUD
- [x] Charts for breakdown
- [x] Auth context + protection
- [ ] Recurring payment logic
- [ ] AI budgeting tips
- [ ] Financial health score algorithm
- [ ] PDF / CSV export
- [ ] Push notifications

---
