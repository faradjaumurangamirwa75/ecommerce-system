
import React, { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Loader2,
  Sparkles,
  Frown,
  ShoppingCart,
  RefreshCw
} from "lucide-react";

import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { cartCount } = useCart();

  // GET PRODUCTS
  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];

      setProducts(data);

    } catch (error) {
      console.error("Error loading products:", error);
      setError("Ntitwabashije kubona ibicuruzwa. Ongera ugerageze.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // GET CATEGORIES
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    )
  ];

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center gap-4">

          <div>
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-full">
              <Sparkles size={14} />
              Faradja Store
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Our Products
            </h1>

            <p className="text-slate-500 mt-2">
              Discover quality food products at affordable prices.
            </p>
          </div>

          {/* CART BUTTON */}
          <Link
            to="/cart"
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl flex items-center gap-2"
          >
            <ShoppingCart size={22} />

            <span className="hidden sm:inline font-semibold">
              Cart
            </span>

            <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

        </div>

        {/* SEARCH */}
        <div className="max-w-xl relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Shakisha ibicuruzwa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:border-emerald-500 outline-none"
          />

        </div>

        {/* CATEGORIES */}
        {!loading && !error && (
          <div className="flex flex-wrap gap-3">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition ${
                  category === item
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-500"
                }`}
              >
                {item === "All" ? "All Products" : item}
              </button>
            ))}

          </div>
        )}

        {/* LOADING */}
        {loading ? (

          <div className="flex flex-col items-center py-24 text-slate-400">

            <Loader2
              size={42}
              className="animate-spin text-emerald-600 mb-4"
            />

            Loading products...

          </div>

        ) : error ? (

          /* ERROR */
          <div className="bg-white rounded-2xl p-10 text-center">

            <Frown size={40} className="mx-auto text-red-500 mb-4" />

            <p className="text-slate-600 mb-5">{error}</p>

            <button
              onClick={getProducts}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl inline-flex gap-2"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

          </div>

        ) : filteredProducts.length === 0 ? (

          /* EMPTY */
          <div className="bg-white rounded-3xl p-12 text-center">

            <ShoppingBag
              size={45}
              className="mx-auto text-emerald-600 mb-4"
            />

            <h3 className="text-xl font-bold">
              Nta bicuruzwa byabonetse
            </h3>

            <p className="text-slate-500 mt-2">
              Gerageza gushakisha ikindi gicuruzwa.
            </p>

          </div>

        ) : (

          /* PRODUCTS */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Products;
