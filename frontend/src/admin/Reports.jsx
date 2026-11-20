
import React, { useEffect, useState } from "react";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Truck,
  Clock,
  RefreshCw,
  Search,
  Loader2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import API from "../services/api";

const Reports = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [orderResponse, productResponse] = await Promise.all([
        API.get("/orders"),
        API.get("/products"),
      ]);

      setOrders(
        Array.isArray(orderResponse.data)
          ? orderResponse.data
          : orderResponse.data.orders || []
      );

      setProducts(
        Array.isArray(productResponse.data)
          ? productResponse.data
          : productResponse.data.products || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const totalSales = orders.reduce(
    (sum, order) =>
      sum + Number(order.total_amount || order.total || 0),
    0
  );

  const delivered = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const pending = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const processing = orders.filter(
    (order) => order.status === "processing"
  ).length;

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    return (
      String(order.id).toLowerCase().includes(searchText) ||
      order.customer_name?.toLowerCase().includes(searchText) ||
      order.status?.toLowerCase().includes(searchText)
    );
  });

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const reportCards = [
    {
      title: "Total Sales",
      value: `${totalSales.toLocaleString()} RWF`,
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Delivered Orders",
      value: delivered,
      icon: Truck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Orders",
      value: pending,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Processing Orders",
      value: processing,
      icon: RefreshCw,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-orange-500" />
        <p className="mt-3 text-sm text-gray-500">
          Loading reports...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row
      sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center
          rounded-xl bg-orange-100 text-orange-600">
            <BarChart3 size={27} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Store Reports
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor your store sales and orders.
            </p>
          </div>
        </div>

        <button
          onClick={fetchReports}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2
          rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white
          shadow-md shadow-orange-100 transition hover:bg-orange-600
          disabled:opacity-60"
        >
          <RefreshCw size={18} />
          Refresh Reports
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border
        border-red-200 bg-red-50 p-4 text-red-600 sm:flex-row
        sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <AlertCircle size={20} />
            <p className="text-sm">{error}</p>
          </div>

          <button
            onClick={fetchReports}
            className="font-semibold hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2
      xl:grid-cols-3">

        {reportCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100
              bg-white p-5 shadow-sm transition hover:-translate-y-1
              hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-gray-800">
                    {card.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-4 ${card.color}`}>
                  <Icon size={25} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Sales Overview */}
      <div className="mb-8 rounded-2xl border border-gray-100
      bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <TrendingUp size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Sales Overview
            </h2>
            <p className="text-sm text-gray-500">
              Overall order value recorded in your store.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-orange-50 p-5">
          <p className="text-sm font-medium text-orange-700">
            Total Order Value
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-600">
            {totalSales.toLocaleString()} RWF
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Calculated from all orders currently returned by the API.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Delivered</span>
              <span className="font-semibold text-green-600">
                {delivered}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width: `${
                    orders.length
                      ? (delivered / orders.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Pending</span>
              <span className="font-semibold text-yellow-600">
                {pending}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-yellow-500"
                style={{
                  width: `${
                    orders.length
                      ? (pending / orders.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Processing</span>
              <span className="font-semibold text-blue-600">
                {processing}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${
                    orders.length
                      ? (processing / orders.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Orders Report */}
      <div className="overflow-hidden rounded-2xl border border-gray-100
      bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-gray-100
        p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Orders Report
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View all customer orders and their status.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-xl border border-gray-200
              bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none
              transition focus:border-orange-500 focus:bg-white
              focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="px-4 py-14 text-center">
            <ShoppingCart size={40} className="mx-auto text-gray-300" />

            <h3 className="mt-3 font-semibold text-gray-700">
              No orders found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              There are no orders matching your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">

              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Total</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-orange-50/40"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-orange-600">
                      #{order.id}
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-700">
                      {order.customer_name || "N/A"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-700">
                      {Number(
                        order.total_amount || order.total || 0
                      ).toLocaleString()} RWF
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs
                        font-semibold capitalize ${getStatusStyle(order.status)}`}
                      >
                        {order.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-gray-400">
        Faradja Store Admin Panel
      </p>

    </div>
  );
};

export default Reports;
