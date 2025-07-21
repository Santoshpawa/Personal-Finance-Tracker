// src/components/IncomeList.jsx
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

export default function IncomeList() {
  const { user } = useAuth();
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "incomes"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncomes(data);
    });

    return () => unsub();
  }, [user]);

  const handleDelete = async (id) => {
    const ref = doc(db, "users", user.uid, "incomes", id);
    await deleteDoc(ref);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-2">
        Income History
      </h2>
      {incomes.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white dark:bg-gray-900 border rounded-xl shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {item.source}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ₹{item.amount} {item.receivedOn && `| ${item.receivedOn}`}
            </p>
            {item.notes && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Note: {item.notes}
              </p>
            )}
          </div>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-500 hover:text-red-700 transition text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
