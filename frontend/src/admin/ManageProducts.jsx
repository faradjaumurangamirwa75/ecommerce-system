
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Package,
  Search,
  RefreshCw,
  Loader2,
  AlertCircle,
  ShoppingBag,
  Boxes,
  AlertTriangle,
  XCircle,
  Filter,
  Image as ImageIcon,
  Pencil,
} from "lucide-react";
import API from "../services/api";

const ManageProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products");

      setProducts(
        Array.isArray(response.data)
          ? response.data
          : response.data.products || response.data.data || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (product) => {
    const id = product.id || product._id;

    if (!id) {
      alert("Product ID is missing.");
      return;
    }

    if (!window.confirm(`Delete ${product.name}?`)) return;

    try {
      setDeletingId(id);

      await API.delete(`/products/${id}`);

      setProducts((old) =>
        old.filter((p) => (p.id || p._id) !== id)
      );

      alert("Product deleted successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message || "Could not delete product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // EDIT PRODUCT
  const editProduct = (product) => {
    const id = product.id || product._id;

    if (!id) {
      alert("Product ID is missing.");
      return;
    }

    navigate(`/admin/products/edit/${id}`);
  };

  // CATEGORIES
  const categories = useMemo(
    () => [
      ...new Set(
        products.map((p) => p.category).filter(Boolean)
      ),
    ],
    [products]
  );

  // INVENTORY STATISTICS
  const lowStock = products.filter(
    (p) => Number(p.stock) > 0 && Number(p.stock) <= 10
  ).length;

  const outOfStock = products.filter(
    (p) => Number(p.stock) <= 0
  ).length;

  const totalStock = products.reduce(
    (total, p) => total + (Number(p.stock) || 0),
    0
  );

  // SEARCH AND FILTER
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    const stock = Number(product.stock) || 0;

    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "Available" && stock > 10) ||
      (stockFilter === "Low Stock" && stock > 0 && stock <= 10) ||
      (stockFilter === "Out of Stock" && stock <= 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // STATISTICS
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: ShoppingBag,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-orange-500">
              FARADJA STORE / ADMIN
            </p>

            <h1 className="text-3xl font-extrabold text-slate-800">
              Manage Products
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your products, prices and inventory.
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
          >
            <Plus size={20} />
            Add New Product
          </Link>
        </div>

        {/* STATISTICS */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold text-slate-800">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`rounded-2xl p-4 ${item.color}`}>
                    <Icon size={27} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INVENTORY OVERVIEW */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-white/10 p-3">
              <Boxes size={28} />
            </div>

            <div>
              <p className="text-sm text-slate-300">
                Total Inventory Quantity
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {totalStock.toLocaleString()}
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300">
            Keep track of your available products.
          </p>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Filter size={19} className="text-orange-500" />

            <h2 className="font-bold text-slate-800">
              Search & Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:border-orange-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="All">All Stock</option>
              <option value="Available">Available</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>

            <button
              onClick={fetchProducts}
              className="font-bold hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* PRODUCT LIST */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Product Inventory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <button
              onClick={fetchProducts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-16">
              <Loader2
                size={35}
                className="animate-spin text-orange-500"
              />

              <p className="mt-3 text-sm text-slate-500">
                Loading products...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Package
                size={45}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-bold text-slate-700">
                No products found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or add a new product.
              </p>

              <Link
                to="/admin/add-product"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600"
              >
                <Plus size={18} />
                Add Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Image</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Stock</th>
                    <th className="px-5 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => {
                    const id = product.id || product._id;
                    const stock = Number(product.stock) || 0;

                    return (
                      <tr
                        key={id}
                        className="transition hover:bg-orange-50/40"
                      >
                        <td className="px-5 py-4">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-16 w-16 rounded-xl border border-slate-100 object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                              <ImageIcon size={25} />
                            </div>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-800">
                            {product.name}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                            {product.description || "No description"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                            {product.category || "Uncategorized"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-700">
                          {Number(product.price).toLocaleString()} RWF
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              stock > 10
                                ? "bg-green-100 text-green-700"
                                : stock > 0
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {stock > 10
                              ? "Available"
                              : stock > 0
                              ? "Low Stock"
                              : "Out of Stock"}
                          </span>

                          <p className="mt-1 text-xs text-slate-400">
                            {stock} units
                          </p>
                        </td>

                        {/* EDIT AND DELETE BUTTONS */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">

                            <button
                              type="button"
                              onClick={() => editProduct(product)}
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteProduct(product)}
                              disabled={deletingId === id}
                              className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              {deletingId === id ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={16} />
                              )}
                              Delete
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Faradja Store Admin Panel
        </p>
      </div>
    </div>
  );
};

export default ManageProducts;
