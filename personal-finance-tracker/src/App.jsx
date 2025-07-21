// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import RecurringPayments from "./pages/RecurringPayments";
import IncomePage from "./pages/IncomePage";
import SavingsGoalsPage from "./pages/SavingGoals";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/recurring"
        element={
          <PrivateRoute>
            <RecurringPayments />
          </PrivateRoute>
        }
      />
      <Route
        path="/income"
        element={
          <PrivateRoute>
            <IncomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/savings"
        element={
          <PrivateRoute>
            <SavingsGoalsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
