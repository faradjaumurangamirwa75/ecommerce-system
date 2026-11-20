
import React, { useEffect, useState } from "react";
import { Mail, Phone, User, Trash2, RefreshCw, MessageSquare } from "lucide-react";
import API from "../services/api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/messages");

      // Supports APIs returning either an array or { messages: [] }
      const data = response.data;
      setMessages(
        Array.isArray(data)
          ? data
          : Array.isArray(data.messages)
          ? data.messages
          : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load messages. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await API.delete(`/messages/${id}`);

      setMessages((previous) =>
        previous.filter((message) => message._id !== id && message.id !== id)
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to delete message."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Customer Messages
            </h1>
            <p className="mt-2 text-gray-500">
              View and manage messages sent by your customers.
            </p>
          </div>

          <button
            onClick={fetchMessages}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-100 p-4 text-orange-600">
              <MessageSquare size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Messages</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {messages.length}
              </h2>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <Mail className="mx-auto mb-4 text-gray-400" size={40} />
            <h3 className="text-lg font-semibold text-gray-700">
              No messages found
            </h3>
            <p className="mt-2 text-gray-500">
              Customer messages will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {messages.map((message) => {
              const id = message._id || message.id;

              return (
                <div
                  key={id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {message.name || "Unknown Customer"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {message.createdAt
                          ? new Date(message.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteMessage(id)}
                      disabled={deletingId === id}
                      title="Delete message"
                      className="rounded-lg bg-red-50 p-3 text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mb-4 space-y-3">
                    <p className="flex items-center gap-3 text-sm text-gray-600">
                      <User size={17} className="text-orange-500" />
                      {message.name || "Not provided"}
                    </p>

                    <p className="flex items-center gap-3 break-all text-sm text-gray-600">
                      <Mail size={17} className="text-orange-500" />
                      {message.email || "No email"}
                    </p>

                    <p className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone size={17} className="text-orange-500" />
                      {message.phone || "No phone number"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-gray-700">
                      Message
                    </h4>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {message.message || "No message content"}
                    </p>
                  </div>

                  {message.email && (
                    <a
                      href={`mailto:${message.email}`}
                      className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      Reply by Email
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminMessages;
