// src/pages/RecurringPayments.jsx
import RecurringForm from "../features/recurring/RecurringForm";
import RecurringList from "../features/recurring/RecurringList";

export default function RecurringPayments() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Recurring Payments</h1>
      <RecurringForm />
      <RecurringList />
    </div>
  );
}
