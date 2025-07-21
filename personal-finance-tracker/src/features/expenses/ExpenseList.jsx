// src/components/ExpenseList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ExpenseList() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "expenses"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    });

    return () => unsub();
  }, [user]);

  const handleDelete = async (id) => {
    const expenseRef = doc(db, "users", user.uid, "expenses", id);
    await deleteDoc(expenseRef);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-2">
        Your Expenses
      </h2>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="p-4 bg-white dark:bg-gray-900 border rounded-xl shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {expense.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ₹{expense.amount} | {expense.category}
            </p>
            {expense.notes && (
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                {expense.notes}
              </p>
            )}
          </div>
          <button
            onClick={() => handleDelete(expense.id)}
            className="text-red-500 hover:text-red-700 transition text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
