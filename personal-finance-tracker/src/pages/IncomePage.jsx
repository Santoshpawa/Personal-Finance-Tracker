// src/pages/IncomePage.jsx
import IncomeForm from "../features/income/IncomeForm";
import IncomeList from "../features/income/IncomeList";

export default function IncomePage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Income Tracking</h1>
      <IncomeForm />
      <IncomeList />
    </div>
  );
}
