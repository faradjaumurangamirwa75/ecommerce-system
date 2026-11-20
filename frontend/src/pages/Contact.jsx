
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import API from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await API.post("/messages", formData);

      setSuccess("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-orange-500 text-white py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-lg">
          We are happy to hear from you. Get in touch with Faradja Store.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Get In Touch
          </h2>

          <p className="text-gray-600 mb-8">
            Do you have questions about our products, prices or delivery?
            Send us a message and we will be happy to help you.
          </p>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <MapPin className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold">Our Location</h3>
                <p className="text-gray-600">Rwanda</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Phone className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold">Phone Number</h3>
                <p className="text-gray-600">Add your store phone number</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Mail className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold">Email Address</h3>
                <p className="text-gray-600">Add your store email</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold">Working Hours</h3>
                <p className="text-gray-600">Monday - Saturday</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Send Us a Message
          </h2>

          {success && (
            <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {success}
            </p>
          )}

          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg outline-orange-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg outline-orange-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-orange-500"
            />

            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border p-3 rounded-lg outline-orange-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
