
import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Home,
  Store,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Manage Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-100 bg-white shadow-xl">

      {/* Sidebar Header */}
      <div className="border-b border-gray-100 px-6 py-7">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500 p-3 text-white shadow-lg">
            <Store size={25} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Faradja<span className="text-orange-500">Store</span>
            </h2>

            <p className="text-xs font-medium tracking-wider text-gray-400">
              ADMIN PANEL
            </p>
          </div>
        </Link>
      </div>

      {/* Admin Profile */}
      <div className="mx-4 mt-6 flex items-center gap-3 rounded-xl bg-orange-50 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
          <Store size={22} />
        </div>

        <div>
          <h3 className="font-bold text-gray-800">Administrator</h3>
          <p className="text-xs text-gray-500">Manage your store</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 px-4">

        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
          Main Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={21} />

                  <span className="text-sm font-semibold">
                    {item.name}
                  </span>
                </div>

                {isActive && (
                  <ChevronRight size={18} />
                )}
              </Link>
            );
          })}
        </div>

      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 p-4">

        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-600 transition hover:bg-green-50 hover:text-green-600"
        >
          <Home size={21} />
          <span className="text-sm">Back to Store</span>
        </Link>

        <div className="mt-5 rounded-xl bg-gray-50 p-4 text-center">
          <p className="text-xs font-semibold text-gray-500">
            Faradja Store
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Admin Management System
          </p>
        </div>

      </div>

    </aside>
  );
};

export default Sidebar;