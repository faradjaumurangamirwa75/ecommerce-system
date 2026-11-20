
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  PackagePlus,
  Save,
  Loader2,
  Image,
  RotateCcw,
  ShoppingBag,
  Tag,
  Boxes,
  Banknote,
  Pencil,
} from "lucide-react";
import API from "../services/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const initialProduct = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  };

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  // Load existing product when editing
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setFetching(true);
        setError("");

        const response = await API.get(`/products/${id}`);

        const data =
          response.data.product ||
          response.data.data ||
          response.data;

        setProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price ?? "",
          stock: data.stock ?? "",
          category: data.category || "",
          image: data.image || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to load product."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setProduct(initialProduct);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!product.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!product.category) {
      setError("Please select a category.");
      return;
    }

    if (product.price === "" || Number(product.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (
      product.stock === "" ||
      Number(product.stock) < 0
    ) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    const productData = {
      ...product,
      name: product.name.trim(),
      price: Number(product.price),
      stock: Number(product.stock),
    };

    try {
      setLoading(true);

      if (isEditMode) {
        await API.put(`/products/${id}`, productData);
        alert("Product updated successfully!");
      } else {
        await API.post("/products", productData);
        alert("Product added successfully!");
      }

      navigate("/admin/products");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/admin/products"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-slate-500 transition hover:text-orange-600"
        >
          <ArrowLeft size={19} />
          Back to Products
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            {isEditMode ? (
              <Pencil size={28} />
            ) : (
              <PackagePlus size={30} />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              {isEditMode ? "Update Product" : "Add New Product"}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update your Faradja Store product information."
                : "Add a product to your Faradja Store inventory."}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {fetching ? (
          <div className="flex min-h-64 items-center justify-center gap-3 rounded-2xl bg-white shadow-sm">
            <Loader2
              size={28}
              className="animate-spin text-orange-500"
            />
            <span className="font-medium text-slate-600">
              Loading product...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
              <h2 className="mb-6 text-lg font-bold text-slate-800">
                Product Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Example: Umuceri"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your product..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Banknote size={17} className="text-orange-500" />
                      Price (RWF) *
                    </label>

                    <input
                      type="number"
                      name="price"
                      min="1"
                      step="1"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Boxes size={17} className="text-orange-500" />
                      Available Stock *
                    </label>

                    <input
                      type="number"
                      name="stock"
                      min="0"
                      step="1"
                      value={product.stock}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Tag size={17} className="text-orange-500" />
                    Product Category *
                  </label>

                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="">Select category</option>
                    <option value="Umuceri">Umuceri</option>
                    <option value="Ibishyimbo">Ibishyimbo</option>
                    <option value="Kawunga">Kawunga</option>
                    <option value="Icyayi">Icyayi</option>
                    <option value="Amata">Amata</option>
                    <option value="Umugati">Umugati</option>
                    <option value="Indazi">Indazi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Image size={17} className="text-orange-500" />
                    Product Image URL
                  </label>

                  <input
                    type="url"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="https://example.com/product.jpg"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Paste a valid image URL.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={18} />
                    Reset Form
                  </button>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/admin/products"
                      className="rounded-xl border border-slate-200 px-6 py-3 text-center font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white shadow-md shadow-orange-100 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={19} className="animate-spin" />
                          {isEditMode ? "Updating..." : "Saving..."}
                        </>
                      ) : (
                        <>
                          <Save size={19} />
                          {isEditMode ? "Update Product" : "Save Product"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
                <ShoppingBag size={20} className="text-orange-500" />
                Product Preview
              </h2>

              <div className="overflow-hidden rounded-xl border border-slate-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name || "Product preview"}
                    className="h-48 w-full bg-slate-50 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center bg-slate-100 text-slate-400">
                    <Image size={40} />
                    <p className="mt-2 text-sm">No image added</p>
                  </div>
                )}

                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-400">
                      Product Name
                    </p>
                    <p className="font-bold text-slate-800">
                      {product.name || "Product name"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-400">
                      Category
                    </p>
                    <p className="text-sm text-slate-600">
                      {product.category || "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Description</p>
                    <p className="text-sm text-slate-600">
                      {product.description || "No description"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-xs text-slate-400">Price</p>
                      <p className="font-bold text-orange-600">
                        {product.price
                          ? `${Number(product.price).toLocaleString()} RWF`
                          : "0 RWF"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">Stock</p>
                      <p className="font-semibold text-slate-700">
                        {product.stock || "0"} units
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                This is a preview of how your product information will appear.
              </p>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          Faradja Store Admin Panel
        </p>
      </div>
    </div>
  );
};

export default AddProduct;
