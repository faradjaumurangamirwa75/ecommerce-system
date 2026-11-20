
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    if (!product || product.id == null) return;

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (productId, quantity) => {
    const newQuantity = Number(quantity);

    if (!Number.isInteger(newQuantity) || newQuantity < 1) return;

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // INCREASE QUANTITY
  const increaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Number(item.quantity) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL PRICE
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // TOTAL ITEMS
  const cartCount = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
    cartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      "useCart must be used inside CartProvider. Check App.jsx."
    );
  }

  return context;
};

export default CartContext;
