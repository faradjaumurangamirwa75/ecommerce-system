
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
  CalendarDays,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/orders/${id}`);

        setOrder(response.data.order);
        setItems(response.data.items || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Could not load order."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString("en-US") + " RWF";

  const getStatusStyle = (status) => {
    const value = String(status || "").toLowerCase();

    if (value === "completed" || value === "delivered") {
      return {
        style: "bg-green-100 text-green-700",
        icon: CheckCircle,
      };
    }

    if (value === "cancelled" || value === "canceled") {
      return {
        style: "bg-red-100 text-red-700",
        icon: AlertCircle,
      };
    }

    if (value === "pending") {
      return {
        style: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      };
    }

    return {
      style: "bg-blue-100 text-blue-700",
      icon: Package,
    };
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 size={42} className="animate-spin text-orange-500" />
        <p className="font-semibold text-gray-500">
          Loading order details...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <AlertCircle size={50} className="mb-4 text-red-500" />

        <h2 className="text-xl font-bold text-gray-800">
          Something went wrong
        </h2>

        <p className="mt-2 text-gray-500">{error}</p>

        <Link
          to="/admin/orders"
          className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  // Order Not Found
  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Package size={55} className="mb-4 text-gray-300" />

        <h2 className="text-xl font-bold text-gray-800">
          Order Not Found
        </h2>

        <Link
          to="/admin/orders"
          className="mt-5 font-semibold text-orange-600 hover:underline"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusStyle(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div>
            <Link
              to="/admin/orders"
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-orange-600"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </Link>

            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Order Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View complete information about this customer order.
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Order Number
            </p>

            <p className="text-xl font-extrabold text-orange-700">
              #{order.id}
            </p>
          </div>

        </div>

        {/* Order Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Amount */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Amount
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  {formatPrice(order.total_amount)}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <CreditCard size={27} />
              </div>
            </div>
          </div>

          {/* Total Items */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Products
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  {items.reduce(
                    (total, item) =>
                      total + Number(item.quantity || 0),
                    0
                  )}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <ShoppingBag size={27} />
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Order Status
            </p>

            <div className="mt-4">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${statusInfo.style}`}
              >
                <StatusIcon size={18} />
                {order.status || "Unknown"}
              </span>
            </div>
          </div>

        </div>

        {/* Customer Information */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <User size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Customer Information
              </h2>

              <p className="text-sm text-gray-500">
                Customer delivery details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            <div>
              <div className="mb-2 flex items-center gap-2 text-gray-400">
                <User size={17} />
                <span className="text-xs font-bold uppercase">
                  Customer Name
                </span>
              </div>

              <p className="font-semibold text-gray-800">
                {order.customer_name || "Not provided"}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-gray-400">
                <Phone size={17} />
                <span className="text-xs font-bold uppercase">
                  Phone Number
                </span>
              </div>

              <p className="font-semibold text-gray-800">
                {order.phone || "Not provided"}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-gray-400">
                <MapPin size={17} />
                <span className="text-xs font-bold uppercase">
                  Delivery Address
                </span>
              </div>

              <p className="font-semibold text-gray-800">
                {order.delivery_address || "Not provided"}
              </p>
            </div>

          </div>
        </div>

        {/* Order Items */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-gray-100 p-6">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <Package size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Order Items
              </h2>

              <p className="text-sm text-gray-500">
                Products purchased by this customer
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left">

              <thead className="bg-gray-50">
                <tr className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Subtotal</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {items.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="transition hover:bg-orange-50/40"
                  >
                    <td className="px-6 py-5 font-semibold text-gray-800">
                      {item.product_name ||
                        item.name ||
                        item.product_id}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                        {item.quantity}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {formatPrice(item.price)}
                    </td>

                    <td className="px-6 py-5 font-bold text-gray-900">
                      {formatPrice(
                        Number(item.price) *
                        Number(item.quantity)
                      )}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Empty Items */}
          {items.length === 0 && (
            <div className="p-10 text-center">
              <Package
                size={45}
                className="mx-auto mb-3 text-gray-300"
              />

              <p className="font-semibold text-gray-500">
                No order items returned by the server.
              </p>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-6">
            <div className="w-full sm:w-72">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-500">
                  Total Amount
                </span>

                <span className="text-2xl font-extrabold text-orange-600">
                  {formatPrice(order.total_amount)}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;