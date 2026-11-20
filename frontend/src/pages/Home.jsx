import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Content Left */}
          <div className="space-y-6 text-center md:text-left z-10">
            <span className="inline-flex items-center gap-2 bg-emerald-500/30 text-emerald-100 text-sm font-medium px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
              <Sparkles size={16} className="text-yellow-300" /> Ibyo kurya byiza kandi bishya
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Welcome to <span className="text-yellow-300">Faradja Store</span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100 max-w-xl font-light leading-relaxed">
              Shop quality food products at affordable prices. Fresh products delivered directly to your doorstep with love and care.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* Graphic Right */}
          <div className="flex justify-center items-center relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl absolute -z-0"></div>
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300">
              <ShoppingBag size={120} className="text-yellow-300 group-hover:rotate-6 transition-transform duration-300" />
              <span className="mt-4 font-semibold text-lg text-emerald-100">Quality Guaranteed</span>
            </div>
          </div>

        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-slate-50">
            <Truck className="text-emerald-600" size={32} />
            <div className="text-left">
              <h4 className="font-bold text-slate-900">Fast Delivery</h4>
              <p className="text-sm text-slate-500">Kugeza ibintu mu rugo vuba</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-slate-50">
            <ShieldCheck className="text-emerald-600" size={32} />
            <div className="text-left">
              <h4 className="font-bold text-slate-900">100% Quality</h4>
              <p className="text-sm text-slate-500">Ibiribwa bizima kandi byujuje ubuziranenge</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-slate-50">
            <ShoppingBag className="text-emerald-600" size={32} />
            <div className="text-left">
              <h4 className="font-bold text-slate-900">Best Prices</h4>
              <p className="text-sm text-slate-500">Ibiciro byoroheye buri wese</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-500 mt-1">Hitamo mu biribwa byacu by'indashyikirwa</p>
          </div>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Reba ibicuruzwa byose <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 size={40} className="animate-spin text-emerald-600 mb-3" />
            <p className="text-sm">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500 text-lg">No products available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;