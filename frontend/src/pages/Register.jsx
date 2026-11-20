
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User, Mail, Phone, Lock, UserPlus,
  Loader2, ShoppingBag, ArrowLeft
} from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
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

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Register customers only
      await register({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });

      alert("Account created successfully! Please login.");

      navigate("/login", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Create Account
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Join <span className="font-semibold text-emerald-600">
              Faradja Store
            </span> today
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-emerald-600" />
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
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
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Phone size={16} className="text-emerald-600" />
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="078XXXXXXX"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-emerald-600" />
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <p className="text-sm text-emerald-800 font-semibold">
              Account Type: Customer
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              All new registrations are customer accounts.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 px-6 rounded-xl disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Register <UserPlus size={20} />
              </>
            )}
          </button>

        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600"
            >
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
