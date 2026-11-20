
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Language
import "./languages/i18n";
import LanguageSelector from "./components/LanguageSelector";

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Customer Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";

// Admin Pages
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import AddProduct from "./admin/AddProduct";
import ManageOrders from "./admin/ManageOrders";
import OrderDetails from "./admin/OrderDetails";
import Reports from "./admin/Reports";
import AdminMessages from "./admin/AdminMessages";

// PROTECTED ROUTE
const ProtectedRoute = ({
  children,
  adminOnly = false,
  customerOnly = false,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (customerOnly && user.role !== "customer") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

// MAIN LAYOUT
const AppLayout = () => {
  return (
    <>
      <Navbar />

      {/* LANGUAGE SELECTOR */}
      <div className="flex justify-end items-center px-4 py-2 bg-gray-50">
        <LanguageSelector />
      </div>

      <main className="min-h-screen">
        <Routes>

          {/* PUBLIC PAGES */}
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* CUSTOMER DASHBOARD */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute customerOnly>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* CUSTOMER PROTECTED PAGES */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute customerOnly>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute customerOnly>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute customerOnly>
                <Messages />
              </ProtectedRoute>
            }
          />

          {/* ADMIN PAGES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <ManageProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute adminOnly>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <ManageOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedRoute adminOnly>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute adminOnly>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute adminOnly>
                <AdminMessages />
              </ProtectedRoute>
            }
          />

          {/* UNKNOWN ROUTES */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </main>

      <Footer />
    </>
  );
};

// MAIN APP
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
