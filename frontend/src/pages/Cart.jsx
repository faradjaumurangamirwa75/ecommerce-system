
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus
} from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    total,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
          <ShoppingBag className="text-emerald-600" size={32} />
          Shopping Cart ({totalItems})
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <ShoppingCart
              size={55}
              className="mx-auto mb-5 text-emerald-600"
            />

            <h2 className="text-2xl font-bold mb-3">
              Pani yawe irimo ubusa!
            </h2>

            <p className="text-slate-500 mb-6">
              Nta gicuruzwa urashyiramo.
            </p>

            <Link
              to="/products"
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl inline-flex gap-2"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center gap-4"
                >

                  <div>
                    <h3 className="text-lg font-bold">
                      {item.name}
                    </h3>

                    <p className="text-slate-500 text-sm mt-2">
                      Price: {Number(item.price).toLocaleString()} RWF
                    </p>

                    <p className="text-emerald-600 font-bold mt-2">
                      Subtotal: {(Number(item.price) * item.quantity).toLocaleString()} RWF
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-slate-100 p-2 rounded-lg"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-emerald-100 text-emerald-700 p-2 rounded-lg"
                      >
                        <Plus size={16} />
                      </button>

                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50 p-3 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>
              ))}

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-emerald-600 mt-4"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>

            </div>

            <div>
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">

                <h2 className="text-xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span>Total Products:</span>
                  <strong>{totalItems}</strong>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total:</span>

                  <span className="text-emerald-600">
                    {Number(total).toLocaleString()} RWF
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-6 bg-yellow-400 hover:bg-yellow-300 py-4 rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
