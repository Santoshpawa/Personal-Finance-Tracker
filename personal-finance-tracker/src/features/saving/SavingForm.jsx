// src/components/SavingsGoalForm.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function SavingsGoalForm() {
  const { user } = useAuth();
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goalName || !targetAmount || !currentAmount) return;

    await addDoc(collection(db, "users", user.uid, "savingsGoals"), {
      goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      createdAt: serverTimestamp(),
    });

    setGoalName("");
    setTargetAmount("");
    setCurrentAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-300 p-4 rounded-xl shadow mb-6"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="p-2 rounded border dark:bg-gray-400"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="p-2 rounded border dark:bg-gray-400"
        />
        <input
          type="number"
          placeholder="Current Amount"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          className="p-2 rounded border dark:bg-gray-400"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Goal
      </button>
    </form>
  );
}
