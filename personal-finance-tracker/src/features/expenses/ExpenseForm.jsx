import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ExpenseForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    notes: "",
  });

  const categories = [
    "Groceries",
    "Utilities",
    "Transport",
    "Rent",
    "Entertainment",
    "Other",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const expenseRef = collection(db, "users", user.uid, "expenses");
    await addDoc(expenseRef, {
      ...form,
      amount: parseFloat(form.amount),
      createdAt: serverTimestamp(),
    });

    setForm({ title: "", amount: "", category: "", notes: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-2xl border border-blue-100"
    >
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Add Expense</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 mb-3 rounded-md border border-blue-300 bg-blue-50"
        required
      />

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full p-2 mb-3 rounded-md border border-blue-300 bg-blue-50"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded-md border border-blue-300 bg-blue-50"
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="w-full p-2 mb-4 rounded-md border border-blue-300 bg-blue-50"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
      >
        Add Expense
      </button>
    </form>
  );
}
