// src/components/IncomeForm.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function IncomeForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    source: "",
    amount: "",
    receivedOn: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const ref = collection(db, "users", user.uid, "incomes");
    await addDoc(ref, {
      ...form,
      amount: parseFloat(form.amount),
      createdAt: serverTimestamp(),
    });

    setForm({ source: "", amount: "", receivedOn: "", notes: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white dark:bg-gray-300 shadow-md p-6 rounded-2xl mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
        Add Income
      </h2>
      <input
        type="text"
        name="source"
        value={form.source}
        onChange={handleChange}
        placeholder="Income Source (e.g. Salary)"
        className="w-full p-2 mb-3 rounded-md border"
        required
      />
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full p-2 mb-3 rounded-md border"
        required
      />
      <input
        type="date"
        name="receivedOn"
        value={form.receivedOn}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded-md border"
      />
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
        className="w-full p-2 mb-4 rounded-md border"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
      >
        Add Income
      </button>
    </form>
  );
}
