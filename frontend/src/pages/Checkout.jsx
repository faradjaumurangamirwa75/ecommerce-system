
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import {
  CreditCard,
  User,
  Phone,
  MapPin,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    delivery_address: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Get logged-in user
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Please login before placing your order.");
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      const userId = user.id || user.user_id;

      if (!userId) {
        setError("User ID not found. Please login again.");
        return;
      }

      // Prepare order information
      const orderData = {
        user_id: userId,
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        delivery_address: form.delivery_address.trim(),
        items: cart.map((item) => ({
          product_id: item.product_id || item.id,
          quantity: Number(item.quantity),
          price: Number(item.price)
        }))
      };

      // Check required information
      if (
        !orderData.customer_name ||
        !orderData.phone ||
        !orderData.delivery_address
      ) {
        setError("Please fill in all customer information.");
        return;
      }

      console.log("ORDER PAYLOAD:", orderData);

      // Send order to backend
      const response = await API.post("/orders", orderData);

      console.log("ORDER RESPONSE:", response.data);

      // Clear cart after successful order
      clearCart();

      alert("Your order has been placed successfully!");

      navigate("/my-orders");

    } catch (err) {
      console.error("ORDER ERROR:", err);
      console.log("SERVER RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to place order."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            <ArrowLeft size={16} /> Subira kuri Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">

            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Checkout
                </h1>
                <p className="text-sm text-slate-500">
                  Uzuza amakuru yawe kugira ngo twohereze ibicuruzwa.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User size={16} className="text-emerald-600" />
                  Full Name
                </label>

                <input
                  type="text"
                  name="customer_name"
                  placeholder="Andika amazina yawe"
                  value={form.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
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
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-600" />
                  Delivery Address
                </label>

                <textarea
                  name="delivery_address"
                  placeholder="Kigali, Gasabo, Remera..."
                  value={form.delivery_address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 px-6 rounded-xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order Now
                    <CheckCircle2 size={20} />
                  </>
                )}
              </button>

            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-6">

              <h3 className="text-lg font-bold text-slate-900 border-b pb-4 mb-4">
                Inshamake yo Kwishyura
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between text-sm">
                  <span>Ibintu biri muri Cart:</span>
                  <span className="font-semibold">
                    {cart.length} items
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Kuzana mu rugo:</span>
                  <span className="font-semibold text-emerald-600">
                    Free
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="text-xl font-extrabold text-emerald-600">
                    {total.toLocaleString()} RWF
                  </span>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span>Amakuru yawe arinzwe.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
