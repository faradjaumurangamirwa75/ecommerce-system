import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, PackageCheck, AlertCircle, Loader2, ShieldCheck, Truck } from "lucide-react";
import API from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Product could not be found.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 size={40} className="animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-medium">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-3xl text-center max-w-md w-full shadow-sm">
          <AlertCircle size={40} className="mx-auto text-rose-600 mb-3" />
          <h2 className="text-lg font-bold mb-1">Ikibazo cyavutse</h2>
          <p className="text-sm mb-6">{error || "Product not found."}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={16} /> Subira Inyuma
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = Number(product.stock) <= 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft size={16} /> Subira Inyuma
          </button>
        </div>

        {/* Main Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Product Image / Visual Container */}
          <div className="w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 relative group">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-6xl text-slate-300 flex flex-col items-center gap-2">
                <span>🛒</span>
                <span className="text-xs font-medium text-slate-400">Faradja Store</span>
              </div>
            )}
            
            {isOutOfStock && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center">
                <span className="bg-rose-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100 mb-3">
                <PackageCheck size={14} /> Faradja Quality Item
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {product.description || "Nta bisobanuro byinshi bitanzwe kuri iki gicuruzwa, ariko ni icyiza kandi cyizewe ku rwego rwo hejuru."}
            </p>

            <div className="flex items-baseline gap-4 pt-2 border-t border-slate-100">
              <span className="text-3xl font-black text-emerald-600">
                {Number(product.price).toLocaleString()} <span className="text-base font-bold">RWF</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <span>Stock ihari:</span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${isOutOfStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'}`}>
                {product.stock} items available
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product)}
                className={`w-full inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold shadow-md transition-all duration-200 cursor-pointer ${
                  isOutOfStock
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-yellow-400 hover:bg-yellow-300 text-slate-900 hover:shadow-lg"
                }`}
              >
                <ShoppingCart size={20} />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>

            {/* Extra Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Truck size={16} />
                </div>
                <span>Kugeza mu rugo vuba</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <span>Ubuziranenge bwemewe</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;