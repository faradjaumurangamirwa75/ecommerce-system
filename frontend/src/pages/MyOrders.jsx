
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import {
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ShoppingBag
} from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setError("Please login again to view your orders.");
          return;
        }

        const user = JSON.parse(storedUser);
        const userId = user.id || user.user_id;

        if (!userId) {
          console.error("User ID is missing:", user);
          setError("User ID not found. Please login again.");
          return;
        }

        const response = await API.get("/orders/my-orders", {
          params: {
            user_id: userId
          }
        });

        const data = response.data;

        setOrders(
          Array.isArray(data)
            ? data
            : data.orders || []
        );

      } catch (err) {
        console.error("Fetch Orders Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Order status badge
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();

    if (s === "completed" || s === "delivered") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 size={14} />
          {status}
        </span>
      );
    }

    if (s === "pending" || s === "processing") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
          <Clock size={14} />
          {status}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
        <Package size={14} />
        {status || "Unknown"}
      </span>
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2
          size={40}
          className="animate-spin text-emerald-600 mb-3"
        />
        <p className="text-sm font-medium">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Subira mu iduka (Products)
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Package className="text-emerald-600" size={32} />
              My Orders
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Amakuru y'ibyo watumije byose muri Faradja Store
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty Orders */}
        {!error && orders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200 max-w-lg mx-auto my-8">

            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={40} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Nta gicuruzwa uratumiza
            </h3>

            <p className="text-slate-500 text-sm mb-6">
              Ibintu byose utumije muri Faradja Store bizajya bihita bigaragara hano.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-colors text-sm"
            >
              Tanga Itumiza (Shop Now)
            </Link>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
            >

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">

                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Order ID
                  </span>

                  <h3 className="text-lg font-extrabold text-slate-900">
                    #{order.id}
                  </h3>
                </div>

                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="text-xs text-slate-400 mb-0.5">
                    Total Amount
                  </p>

                  <p className="text-xl font-extrabold text-emerald-600">
                    {Number(order.total_amount || 0).toLocaleString()} RWF
                  </p>
                </div>

                <div className="flex items-start gap-2 text-slate-600">
                  <MapPin
                    size={18}
                    className="text-emerald-600 shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">
                      Delivery Address
                    </p>

                    <p className="font-medium text-slate-800">
                      {order.delivery_address || "Not provided"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyOrders;
