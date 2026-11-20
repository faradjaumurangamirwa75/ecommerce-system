
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  Truck,
  Plus,
  Eye,
  RefreshCw,
  AlertCircle,
  Loader2,
  TrendingUp,
} from "lucide-react";

import API from "../services/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Load Dashboard Data
  const loadData = async () => {
    try {
      setRefreshing(true);
      setError("");

      const [p, o] = await Promise.all([
        API.get("/products"),
        API.get("/orders"),
      ]);

      const productData = p.data;
      const orderData = o.data;

      setProducts(
        Array.isArray(productData)
          ? productData
          : productData.products || []
      );

      setOrders(
        Array.isArray(orderData)
          ? orderData
          : orderData.orders || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const customers = new Set(
    orders
      .map((order) => order.user_id || order.phone)
      .filter(Boolean)
  ).size;

  const sales = orders.reduce(
    (sum, order) =>
      sum + Number(order.total_amount || order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) =>
      order.status === "cancelled" ||
      order.status === "canceled"
  ).length;

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString("en-US") + " RWF";

  // Recent Orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.created_at || 0) -
        new Date(a.created_at || 0)
    )
    .slice(0, 5);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2
          size={45}
          className="animate-spin text-orange-500"
        />

        <p className="font-semibold text-gray-500">
          Loading Faradja Store Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome to Faradja Store Administration.
              Manage your business from one place.
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh Data
          </button>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={22} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white shadow-lg sm:p-8">

          <div className="relative z-10">
            <p className="text-sm font-semibold text-orange-100">
              FARADJA STORE
            </p>

            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Welcome, Administrator!
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-orange-50">
              Manage your products, monitor customer orders
              and keep your business growing.
            </p>

            <Link
              to="/admin/products"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-orange-600 shadow transition hover:bg-orange-50"
            >
              <Package size={19} />
              Manage Products
            </Link>
          </div>

          <div className="absolute -right-10 -top-12 opacity-10">
            <ShoppingBag size={230} />
          </div>

        </div>

        {/* Main Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Products */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Products
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                  {totalProducts}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  Products in your store
                </p>
              </div>

              <div className="rounded-xl bg-orange-100 p-4 text-orange-600">
                <Package size={28} />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Orders
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                  {totalOrders}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  Customer purchases
                </p>
              </div>

              <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
                <ShoppingBag size={28} />
              </div>
            </div>
          </div>

          {/* Customers */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Customers
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                  {customers}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  Identified customers
                </p>
              </div>

              <div className="rounded-xl bg-purple-100 p-4 text-purple-600">
                <Users size={28} />
              </div>
            </div>
          </div>

          {/* Sales */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Order Value
                </p>

                <h2 className="mt-3 text-xl font-extrabold text-orange-600">
                  {formatPrice(sales)}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  Value of all orders
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-4 text-green-600">
                <DollarSign size={28} />
              </div>
            </div>
          </div>

        </div>

        {/* Order Statistics */}
        <div className="mb-8">

          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-gray-900">
              Order Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track the progress of customer orders.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Pending */}
            <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
                  <Clock size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Pending Orders
                  </p>

                  <h3 className="text-2xl font-extrabold text-yellow-600">
                    {pendingOrders}
                  </h3>
                </div>
              </div>
            </div>

            {/* Processing */}
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Truck size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Processing Orders
                  </p>

                  <h3 className="text-2xl font-extrabold text-blue-600">
                    {processingOrders}
                  </h3>
                </div>
              </div>
            </div>

            {/* Delivered */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                  <CheckCircle size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Delivered Orders
                  </p>

                  <h3 className="text-2xl font-extrabold text-green-600">
                    {deliveredOrders}
                  </h3>
                </div>
              </div>
            </div>

            {/* Cancelled */}
            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <AlertCircle size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Cancelled Orders
                  </p>

                  <h3 className="text-2xl font-extrabold text-red-600">
                    {cancelledOrders}
                  </h3>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Quickly access your store management tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              to="/admin/products"
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50"
            >
              <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                <Package size={23} />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Manage Products
                </h3>

                <p className="text-xs text-gray-500">
                  View all products
                </p>
              </div>
            </Link>

            <Link
              to="/admin/add-product"
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-green-200 hover:bg-green-50"
            >
              <div className="rounded-lg bg-green-100 p-3 text-green-600">
                <Plus size={23} />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Add Product
                </h3>

                <p className="text-xs text-gray-500">
                  Add new products
                </p>
              </div>
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                <ShoppingBag size={23} />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Manage Orders
                </h3>

                <p className="text-xs text-gray-500">
                  View customer orders
                </p>
              </div>
            </Link>

            <Link
              to="/admin/reports"
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50"
            >
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
                <TrendingUp size={23} />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  View Reports
                </h3>

                <p className="text-xs text-gray-500">
                  Check business reports
                </p>
              </div>
            </Link>

          </div>
        </div>

        {/* Recent Orders */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-6">

            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest customer purchases.
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="flex items-center gap-2 font-bold text-orange-600 transition hover:text-orange-700"
            >
              View All
              <Eye size={18} />
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left">

              <thead className="bg-gray-50">
                <tr className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No orders available yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-orange-50/40"
                    >
                      <td className="px-6 py-5 font-bold text-orange-600">
                        #{order.id}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-800">
                        {order.customer_name ||
                          order.full_name ||
                          order.name ||
                          "N/A"}
                      </td>

                      <td className="px-6 py-5 font-bold text-gray-800">
                        {formatPrice(
                          order.total_amount || order.total
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status || "pending"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm font-bold text-orange-600 transition hover:bg-orange-100"
                        >
                          <Eye size={16} />
                          Details
                        </Link>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Faradja Store. All rights reserved.
        </div>

      </div>
    </div>
  );
};

export default Dashboard;