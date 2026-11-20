
import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Heart,
  ArrowRight,
  Phone,
  Store,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  const products = [
    {
      name: "Rice",
      description: "Quality rice for your daily meals.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700",
    },
    {
      name: "Beans",
      description: "Good quality beans for your family.",
      image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=700",
    },
    {
      name: "Kawunga",
      description: "Flour for delicious traditional meals.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700",
    },
    {
      name: "Tea",
      description: "Enjoy a warm and refreshing cup of tea.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700",
    },
    {
      name: "Milk",
      description: "Milk for your everyday needs.",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700",
    },
    {
      name: "Bread",
      description: "Fresh bread for breakfast and snacks.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
    },
    {
      name: "Mandazi",
      description: "Delicious snacks for every moment.",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484c3?w=700",
    },
  ];

  const benefits = [
    {
      icon: <ShieldCheck size={30} />,
      title: "Quality Products",
      description: "We aim to provide quality products to our customers.",
    },
    {
      icon: <ShoppingBag size={30} />,
      title: "Easy Shopping",
      description: "Shop your favorite products easily from anywhere.",
    },
    {
      icon: <Truck size={30} />,
      title: "Order Delivery",
      description: "Customers can provide their delivery address when ordering.",
    },
    {
      icon: <Heart size={30} />,
      title: "Customer Care",
      description: "We value our customers and their satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-700 to-orange-500 px-5 py-20 text-white md:py-28">

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Store size={18} />
              Welcome to Faradja Store
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Quality Products,
              <span className="block text-yellow-200">
                Best Prices!
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-orange-50">
              Welcome to Faradja Store, your online shopping destination
              for everyday food products and household essentials.
              Shop easily, save time and enjoy convenient shopping.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-orange-600 shadow-lg transition hover:bg-orange-50"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-7 py-4 font-bold text-white transition hover:bg-white hover:text-orange-600"
              >
                Contact Us
                <Phone size={19} />
              </Link>

            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000"
              alt="Fresh groceries at Faradja Store"
              className="h-80 w-full rounded-3xl object-cover shadow-2xl md:h-[450px]"
            />

            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-5 text-gray-900 shadow-xl md:-left-8">
              <p className="text-sm font-semibold text-gray-500">
                Welcome to
              </p>
              <p className="text-xl font-extrabold text-orange-600">
                Faradja Store
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT US */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl text-center">

          <span className="font-bold uppercase tracking-widest text-orange-500">
            About Our Business
          </span>

          <h2 className="mb-6 mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Who We Are
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            Faradja Store is an online grocery shopping business.
            We help customers find and order everyday food products
            such as rice, beans, flour, tea, milk, bread and mandazi.
            Our goal is to make shopping simple, convenient and
            accessible to everyone.
          </p>

        </div>
      </section>

      {/* STORE VIDEO */}
      <section className="bg-orange-50 px-5 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <span className="font-bold uppercase tracking-widest text-orange-600">
              Discover Faradja Store
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              See What We Sell
            </h2>

            <p className="mt-3 text-gray-600">
              Watch our product presentation and discover what we offer.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-black shadow-2xl">
            <video
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full object-contain"
              poster="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200"
            >
              <source
                src="/videos/faradja-store-products.mp4"
                type="video/mp4"
              />

              Your browser does not support video playback.
            </video>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Faradja Store – Quality Products, Best Prices.
          </p>

        </div>
      </section>

      {/* OUR PRODUCTS */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <span className="font-bold uppercase tracking-widest text-orange-500">
              Our Products
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              What We Sell
            </h2>

            <p className="mt-3 text-gray-500">
              Explore some of the products available at Faradja Store.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <div
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-50 px-5 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <span className="font-bold uppercase tracking-widest text-orange-500">
              Our Advantages
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Why Choose Faradja Store?
            </h2>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:shadow-lg"
              >

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  {benefit.icon}
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="text-sm leading-6 text-gray-500">
                  {benefit.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-orange-600 px-7 py-14 text-center text-white md:px-16">

          <CheckCircle2 size={48} className="mx-auto mb-5 text-yellow-200" />

          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">
            Our Promise to You
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-orange-50">
            At Faradja Store, we aim to make your shopping experience
            easy and convenient. Your needs and satisfaction matter to us.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-gray-100 px-5 py-12 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Have a Question?
        </h2>

        <p className="mb-6 mt-2 text-gray-500">
          Contact our team for assistance with your orders.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700"
        >
          Contact Faradja Store
          <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
};

export default About;
