import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function SavingsGoalList() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [addingAmount, setAddingAmount] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users", user.uid, "savingsGoals"),
      (snapshot) => {
        const goalsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGoals(goalsData);
      }
    );
    return () => unsub();
  }, [user.uid]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "savingsGoals", id));
  };

  const handleAddFunds = async (id, amountToAdd) => {
    const goal = goals.find((g) => g.id === id);
    const newAmount =
      parseFloat(goal.currentAmount || 0) + parseFloat(amountToAdd || 0);

    await updateDoc(doc(db, "users", user.uid, "savingsGoals", id), {
      currentAmount: newAmount,
    });

    setAddingAmount((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progress = Math.min(
          (goal.currentAmount / goal.targetAmount) * 100,
          100
        ).toFixed(1);

        return (
          <div
            key={goal.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg">{goal.goalName}</h3>
                <p className="text-sm text-gray-500">
                  ${goal.currentAmount} / ${goal.targetAmount}
                </p>
              </div>
              <button
                onClick={() => handleDelete(goal.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>

            <div className="w-full bg-gray-300 h-3 rounded">
              <div
                className="h-3 bg-green-500 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                placeholder="Add amount"
                value={addingAmount[goal.id] || ""}
                onChange={(e) =>
                  setAddingAmount((prev) => ({
                    ...prev,
                    [goal.id]: e.target.value,
                  }))
                }
                className="p-1 border rounded w-32 dark:bg-gray-700"
              />
              <button
                onClick={() => handleAddFunds(goal.id, addingAmount[goal.id])}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Funds
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
