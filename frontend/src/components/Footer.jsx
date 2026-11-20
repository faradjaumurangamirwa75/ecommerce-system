
import React from "react";
import { Link } from "react-router-dom";

import {
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Store Information */}
        <div>
          <Link to="/" className="mb-5 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
              <ShoppingBag size={26} />
            </div>

            <span className="text-2xl font-bold text-white">
              Faradja <span className="text-orange-500">Store</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-400">
            Your trusted online shop for quality products at affordable
            prices. We bring everyday essentials closer to you.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
            <Heart size={16} />
            Quality products, better prices.
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Shopping Cart", path: "/cart" },
              { name: "Login", path: "/login" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 transition hover:translate-x-1 hover:text-orange-500"
                >
                  <ArrowRight size={15} className="text-orange-500" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Contact Us
          </h3>

          <ul className="space-y-5 text-sm">

            <li className="flex items-start gap-3">
              <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
                <Phone size={18} />
              </div>

              <div>
                <p className="font-semibold text-white">Phone</p>
                <a
                  href="tel:+250782157419"
                  className="mt-1 block text-gray-400 transition hover:text-orange-500"
                >
                  +250 782 157 419
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
                <Mail size={18} />
              </div>

              <div>
                <p className="font-semibold text-white">Email</p>
                <a
                  href="mailto:faradjaumurangamirwa75@gmail.com"
                  className="mt-1 block break-all text-gray-400 transition hover:text-orange-500"
                >
                  faradjaumurangamirwa75@gmail.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
                <MapPin size={18} />
              </div>

              <div>
                <p className="font-semibold text-white">Location</p>
                <p className="mt-1 text-gray-400">
                  Kigali, Rwanda
                </p>
              </div>
            </li>

          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Follow Us
          </h3>

          <p className="mb-5 text-sm leading-6 text-gray-400">
            Follow Faradja Store on social media to stay updated
            with our products and offers.
          </p>

          <div className="flex items-center gap-3">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-800 text-white transition hover:-translate-y-1 hover:bg-orange-500"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-800 text-white transition hover:-translate-y-1 hover:bg-orange-500"
            >
              <FaInstagram size={20} />
            </a>

          </div>

          <div className="mt-7 rounded-xl border border-gray-800 bg-gray-900 p-4">
            <p className="text-sm font-semibold text-white">
              Shop with confidence
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-400">
              Discover everyday products at affordable prices.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Faradja Store.
            All Rights Reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with{" "}
            <Heart
              size={14}
              className="mx-1 inline text-orange-500"
              fill="currentColor"
            />{" "}
            in Rwanda
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
