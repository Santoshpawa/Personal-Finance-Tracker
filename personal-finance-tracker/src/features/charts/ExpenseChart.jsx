import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA00FF",
  "#FF00AA",
];

export default function ExpenseChart() {
  const { user } = useAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const expenseRef = collection(db, "users", user.uid, "expenses");
    const incomeRef = collection(db, "users", user.uid, "incomes");

    const unsubExpenses = onSnapshot(expenseRef, (snapshot) => {
      const data = {};
      snapshot.forEach((doc) => {
        const { category, amount } = doc.data();
        if (category && amount) {
          data[category] = (data[category] || 0) + amount;
        }
      });

      const transformed = Object.entries(data).map(([name, value]) => ({
        name,
        value,
      }));

      setExpenseData(transformed);
    });

    const unsubIncome = onSnapshot(incomeRef, (snapshot) => {
      const data = {};
      snapshot.forEach((doc) => {
        const { source, amount } = doc.data(); // assuming income has `source`
        if (source && amount) {
          data[source] = (data[source] || 0) + amount;
        }
      });

      const transformed = Object.entries(data).map(([name, value]) => ({
        name,
        value,
      }));

      setIncomeData(transformed);
    });

    return () => {
      unsubExpenses();
      unsubIncome();
    };
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-green-600">
          Income Breakdown
        </h3>
        {incomeData.length > 0 ? (
          <PieChart width={400} height={300}>
            <Pie
              data={incomeData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {incomeData.map((_, index) => (
                <Cell key={index} fill={COLORS[(index + 3) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-sm text-gray-500">No income data yet.</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-red-600">
          Expense Breakdown
        </h3>
        {expenseData.length > 0 ? (
          <PieChart width={400} height={300}>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {expenseData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-sm text-gray-500">No expense data yet.</p>
        )}
      </div>
    </div>
  );
}
