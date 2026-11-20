
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Store,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Home,
  ShoppingBag,
  Info,
  Phone,
  Package,
  MessageCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const cartContext = useCart();
  const authContext = useAuth();

  const cart = cartContext?.cart || [];
  const user = authContext?.user || null;
  const logout = authContext?.logout || (() => {});

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const closeMenu = () => setIsOpen(false);

  const linkClass = (path) =>
    `flex items-center gap-2 font-semibold transition ${
      location.pathname === path
        ? "text-orange-600"
        : "text-gray-700 hover:text-orange-500"
    }`;

  const customerLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/products", label: "Products", icon: ShoppingBag },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  const adminLinks = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/orders", label: "Manage Orders", icon: Package },
    { path: "/admin/messages", label: "Messages", icon: MessageCircle },
  ];

  const renderLink = (item) => {
    const Icon = item.icon;

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={closeMenu}
        className={linkClass(item.path)}
      >
        <Icon size={19} />
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      {/* Announcement */}
      <div className="bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white">
        Welcome to Faradja Store! Fresh products at affordable prices.
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex min-h-20 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="rounded-xl bg-orange-500 p-3 text-white shadow-lg">
              <Store size={27} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                Faradja<span className="text-orange-500">Store</span>
              </h1>

              <p className="text-xs font-medium text-gray-500">
                Quality Products, Best Prices
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:flex">
            {customerLinks.map(renderLink)}

            <Link
              to="/cart"
              className={linkClass("/cart")}
            >
              <ShoppingCart size={20} />
              Cart
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            </Link>

            {user?.role === "customer" && (
              <>
                {renderLink({
                  path: "/my-orders",
                  label: "My Orders",
                  icon: Package,
                })}

                {renderLink({
                  path: "/messages",
                  label: "Messages",
                  icon: MessageCircle,
                })}
              </>
            )}

            {user?.role === "admin" &&
              adminLinks.map(renderLink)}
          </div>

          {/* User Actions */}
          <div className="hidden items-center gap-3 md:flex">

            {user ? (
              <>
                <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                  {user.full_name || user.name || "User"}
                </span>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 font-semibold text-gray-700 transition hover:text-orange-500"
                >
                  <User size={18} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-orange-500 px-5 py-3 font-bold text-white shadow-md transition hover:bg-orange-600"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg bg-orange-50 p-2 text-orange-600 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={27} /> : <Menu size={27} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">

          <div className="flex flex-col gap-5">

            {customerLinks.map(renderLink)}

            <Link
              to="/cart"
              onClick={closeMenu}
              className={linkClass("/cart")}
            >
              <ShoppingCart size={20} />
              Cart ({cartCount})
            </Link>

            {user?.role === "customer" && (
              <>
                {renderLink({
                  path: "/my-orders",
                  label: "My Orders",
                  icon: Package,
                })}

                {renderLink({
                  path: "/messages",
                  label: "My Messages",
                  icon: MessageCircle,
                })}
              </>
            )}

            {user?.role === "admin" && (
              <>
                <div className="border-t border-gray-100 pt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Admin Menu
                </div>

                {adminLinks.map(renderLink)}
              </>
            )}

            {user ? (
              <>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-600">
                    {user.full_name || user.name || "User"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="flex items-center gap-3 font-semibold text-red-600"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={linkClass("/login")}
                >
                  <User size={20} />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-orange-500 px-5 py-3 text-center font-bold text-white hover:bg-orange-600"
                >
                  Create Account
                </Link>
              </>
            )}

          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
