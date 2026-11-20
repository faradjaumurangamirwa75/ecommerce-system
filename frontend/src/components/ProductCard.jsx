
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  CheckCircle,
  Plus,
  Minus,
  Check,
  Zap
} from "lucide-react";

import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const stock = Number(product?.stock || 0);
  const price = Number(product?.price || 0);

  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  const quantityInCart = Number(cartItem?.quantity || 0);
  const remainingStock = Math.max(0, stock - quantityInCart);

  const isOutOfStock = remainingStock <= 0;

  const handleAddToCart = () => {
    if (!product || quantity > remainingStock || quantity < 1) {
      return;
    }

    addToCart(product, quantity);

    setQuantity(1);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!product || isOutOfStock || quantity > remainingStock || quantity < 1) {
      return;
    }

    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* PRODUCT IMAGE */}
      <div className="relative h-56 overflow-hidden bg-orange-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package size={65} className="text-orange-300" />
          </div>
        )}

        {/* STOCK STATUS */}
        <div className="absolute left-3 top-3">
          {isOutOfStock ? (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              Out of Stock
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
              <CheckCircle size={13} />
              Available
            </span>
          )}
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="p-5">
        <h3 className="mb-2 truncate text-lg font-bold text-gray-900 group-hover:text-orange-600">
          {product.name}
        </h3>

        <p className="mb-4 line-clamp-2 min-h-10 text-sm text-gray-500">
          {product.description || "Quality product available at Faradja Store."}
        </p>

        {/* PRICE AND STOCK */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <h4 className="text-xl font-extrabold text-orange-600">
              {price.toLocaleString("en-US")} RWF
            </h4>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">Available Stock</p>
            <p className={`text-sm font-bold ${
              isOutOfStock ? "text-red-500" : "text-green-600"
            }`}>
              {remainingStock} items
            </p>
          </div>
        </div>

        {/* QUANTITY SELECTOR */}
        {!isOutOfStock && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Select Quantity
            </p>

            <div className="flex items-center justify-between rounded-xl border p-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-40"
              >
                <Minus size={18} />
              </button>

              <span className="text-lg font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => Math.min(remainingStock, q + 1))}
                disabled={quantity >= remainingStock}
                className="rounded-lg bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 disabled:opacity-40"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500">Total Price:</span>
              <strong className="text-orange-600">
                {(price * quantity).toLocaleString("en-US")} RWF
              </strong>
            </div>
          </div>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || quantity > remainingStock}
          className={`mb-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white transition-all ${
            isOutOfStock
              ? "cursor-not-allowed bg-gray-300"
              : added
                ? "bg-green-600"
                : "bg-orange-500 hover:bg-orange-600 active:scale-95"
          }`}
        >
          {added ? (
            <>
              <Check size={20} />
              Added Successfully!
            </>
          ) : isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart size={20} />
              Add to Cart
            </>
          )}
        </button>

        {/* BUY NOW */}
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock || quantity > remainingStock}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <Zap size={20} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
