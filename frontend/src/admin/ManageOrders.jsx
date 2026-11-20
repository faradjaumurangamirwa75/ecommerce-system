
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  Trash2,
  RefreshCw,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  Package,
  AlertCircle,
  Loader2,
} from "lucide-react";

import API from "../services/api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      setError("");

      const response = await API.get("/orders");

      const data = response.data;

      setOrders(
        Array.isArray(data) ? data : data.orders || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load orders."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Order Status
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await API.put(`/orders/${id}/status`, { status });

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      window.alert(
        err.response?.data?.message ||
        "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await API.delete(`/orders/${id}`);

      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) => order.id !== id
        )
      );
    } catch (err) {
      window.alert(
        err.response?.data?.message ||
        "Failed to delete order."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Format Price
  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString("en-US") + " RWF";

  // Status Style
  const getStatusStyle = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Statistics
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      ["delivered"].includes(
        String(order.status || "").toLowerCase()
      )
        ? total +
          Number(order.total_amount || order.total || 0)
        : total,
    0
  );

  // Search and Filter
  const filteredOrders = orders.filter((order) => {
    const customer =
      order.customer_name ||
      order.full_name ||
      order.name ||
      "";

    const searchText = [
      order.id,
      customer,
      order.phone,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesStatus =
      filterStatus === "all" ||
      String(order.status || "pending").toLowerCase() ===
        filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2
          size={42}
          className="animate-spin text-orange-500"
        />
        <p className="font-semibold text-gray-500">
          Loading customer orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Manage Orders
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Monitor and manage all customer orders.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={22} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total Orders */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  {totalOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <ShoppingBag size={25} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Pending
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-yellow-600">
                  {pendingOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
                <Clock size={25} />
              </div>
            </div>
          </div>

          {/* Processing */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Processing
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-blue-600">
                  {processingOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Package size={25} />
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Delivered
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-green-600">
                  {deliveredOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <CheckCircle size={25} />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Delivered Revenue
                </p>

                <h2 className="mt-2 text-lg font-extrabold text-orange-600">
                  {formatPrice(totalRevenue)}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Truck size={25} />
              </div>
            </div>
          </div>

        </div>

        {/* Orders Table Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Table Header */}
          <div className="border-b border-gray-100 p-5 sm:p-6">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Customer Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage customer purchases.
                </p>
              </div>

              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                {filteredOrders.length} Orders
              </span>

            </div>

            {/* Search and Filter */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">

              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by customer, phone or order ID..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value)
                }
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-orange-400"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

            </div>

          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-left">

              <thead className="bg-gray-50">
                <tr className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-14 text-center"
                    >
                      <ShoppingBag
                        size={45}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-semibold text-gray-500">
                        No orders found.
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try another search or filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-orange-50/40"
                    >

                      <td className="px-6 py-5 font-bold text-orange-600">
                        #{order.id}
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-800">
                          {order.customer_name ||
                            order.full_name ||
                            order.name ||
                            "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {order.phone || "N/A"}
                      </td>

                      <td className="px-6 py-5 font-bold text-gray-800">
                        {formatPrice(
                          order.total_amount || order.total
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <div className="flex flex-col gap-2">

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status || "pending"}
                          </span>

                          <select
                            value={order.status || "pending"}
                            disabled={updatingId === order.id}
                            onChange={(e) =>
                              updateStatus(
                                order.id,
                                e.target.value
                              )
                            }
                            className="w-32 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-700 outline-none focus:border-orange-400 disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          {updatingId === order.id && (
                            <span className="text-xs text-orange-500">
                              Updating...
                            </span>
                          )}

                        </div>

                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-gray-500">
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <Link
                            to={`/admin/orders/${order.id}`}
                            title="View order details"
                            className="rounded-lg bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye size={18} />
                          </Link>

                          <button
                            onClick={() =>
                              deleteOrder(order.id)
                            }
                            disabled={deletingId === order.id}
                            title="Delete order"
                            className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            {deletingId === order.id ? (
                              <Loader2
                                size={18}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

          {/* Table Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-800">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-800">
                {totalOrders}
              </span>{" "}
              orders
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageOrders;
