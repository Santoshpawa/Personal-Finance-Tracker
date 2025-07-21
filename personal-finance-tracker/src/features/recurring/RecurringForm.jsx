// src/components/RecurringPaymentsForm.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function RecurringPaymentsForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    frequency: "monthly",
    startDate: "",
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

    const ref = collection(db, "users", user.uid, "recurringPayments");
    await addDoc(ref, {
      ...form,
      amount: parseFloat(form.amount),
      createdAt: serverTimestamp(),
    });

    setForm({
      name: "",
      amount: "",
      category: "",
      frequency: "monthly",
      startDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white dark:bg-gray-300 shadow-md p-6 rounded-2xl mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
        Add Recurring Payment
      </h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name (e.g. Rent)"
        className="w-full p-2 mb-3 rounded-md border dark:bg-gray-400"
        required
      />
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full p-2 mb-3 rounded-md border dark:bg-gray-400"
        required
      />
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category (e.g. Housing)"
        className="w-full p-2 mb-3 rounded-md border dark:bg-gray-400"
      />
      <select
        name="frequency"
        value={form.frequency}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded-md border dark:bg-gray-400"
      >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded-md border dark:bg-gray-400"
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
      >
        Add Recurring Payment
      </button>
    </form>
  );
}
