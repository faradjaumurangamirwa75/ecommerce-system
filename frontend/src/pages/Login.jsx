
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Mail,
  Lock,
  LogIn,
  Loader2,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  User,
} from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await login(
        form.email.trim().toLowerCase(),
        form.password
      );

      const user = response?.user;

      if (!user) {
        throw new Error("User information not found.");
      }

      // CHECK SELECTED ROLE
      if (user.role !== form.role) {
        throw new Error(
          `This account is not registered as ${form.role}.`
        );
      }

      // ADMIN RULE
      if (form.role === "admin") {
        if (user.email.toLowerCase() !== "theogen@gmail.com") {
          throw new Error("Unauthorized admin account.");
        }

        navigate("/admin/dashboard", { replace: true });
      }

      // CUSTOMER RULE
      else if (form.role === "customer") {
        navigate("/customer/dashboard", { replace: true });
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4">

      <div className="max-w-md w-full mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Welcome Back
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Login to <span className="font-semibold text-emerald-600">
              Faradja Store
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* CHOOSE ROLE */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Choose Your Role
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setForm({ ...form, role: "customer" })}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-semibold transition ${
                  form.role === "customer"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <User size={19} />
                Customer
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, role: "admin" })}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-semibold transition ${
                  form.role === "admin"
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <ShieldCheck size={19} />
                Admin
              </button>

            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Mail size={16} className="text-emerald-600" />
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-emerald-600" />
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 px-6 rounded-xl disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login <LogIn size={20} />
              </>
            )}
          </button>

        </form>

        {form.role === "customer" && (
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-600"
              >
                Register here
              </Link>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
