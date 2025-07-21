import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const budgets = {
  Groceries: 5000,
  Utilities: 3000,
  Rent: 15000,
  Transport: 2000,
  Entertainment: 2500,
  Other: 5000,
};

export default function BudgetTracker() {
  const { user } = useAuth();
  const [categorySpend, setCategorySpend] = useState({});

  useEffect(() => {
    if (!user) return;

    const expenseRef = collection(db, "users", user.uid, "expenses");

    const unsub = onSnapshot(expenseRef, (snapshot) => {
      const data = {};
      snapshot.docs.forEach((doc) => {
        const { category, amount } = doc.data();
        if (category && typeof amount === "number") {
          data[category] = (data[category] || 0) + amount;
        }
      });
      setCategorySpend(data);
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Budget Tracker</h3>
      {Object.entries(budgets).map(([category, limit]) => {
        const spent = categorySpend[category] || 0;
        const percent = Math.min((spent / limit) * 100, 100).toFixed(1);

        return (
          <div key={category} className="mb-4">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>{category}</span>
              <span>
                ₹{spent} / ₹{limit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className={`h-2 rounded ${
                  percent >= 100 ? "bg-red-600" : "bg-green-500"
                }`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            {percent >= 100 && (
              <p className="text-red-600 text-xs mt-1">⚠ Over budget!</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
