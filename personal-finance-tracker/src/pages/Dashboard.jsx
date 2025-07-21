import Navbar from "../components/Navbar";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpenseList from "../features/expenses/ExpenseList";
import BudgetTracker from "../features/budget/BudgetTracker";
import ExpenseChart from "../features/charts/ExpenseChart";
import RecurringForm from "../features/recurring/RecurringForm";
import RecurringList from "../features/recurring/RecurringList";
import SavingsGoalForm from "../features/saving/SavingForm";
import SavingsGoalList from "../features/saving/SavingList";
import IncomeForm from "../features/income/IncomeForm";
import IncomeList from "../features/income/IncomeList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section>
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Personal Finance Manager
          </h1>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Add Income</h2>
          <IncomeForm />
        </section>
        <section>
          <IncomeList />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Add Expense</h2>
          <ExpenseForm />
        </section>

        <section>
          <ExpenseList />
        </section>

        <section>
          <BudgetTracker />
        </section>

        <section>
          <ExpenseChart />
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Recurring Payments
          </h2>
          <RecurringForm />
          <RecurringList />
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">Savings Goals</h2>
          <SavingsGoalForm />
          <SavingsGoalList />
        </section>
      </main>
    </div>
  );
}
