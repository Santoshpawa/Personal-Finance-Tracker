// src/pages/SavingsGoalsPage.jsx
import SavingsGoalForm from "../features/saving/SavingForm";
import SavingsGoalList from "../features/saving/SavingList";

export default function SavingsGoalsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Savings Goals</h1>
      <SavingsGoalForm />
      <SavingsGoalList />
    </div>
  );
}
