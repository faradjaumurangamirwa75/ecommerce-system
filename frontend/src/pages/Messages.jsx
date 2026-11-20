
import React, { useState } from "react";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  MessageCircle,
  User,
  Clock,
  Inbox,
  CheckCircle,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    name: "Jean Claude",
    email: "jean@gmail.com",
    subject: "Order Information",
    message: "Hello, I would like to know when my order will be delivered.",
    date: "2026-11-18",
    read: false,
  },
  {
    id: 2,
    name: "Marie Grace",
    email: "marie@gmail.com",
    subject: "Product Availability",
    message: "Do you have fresh milk and bread available today?",
    date: "2026-11-17",
    read: true,
  },
  {
    id: 3,
    name: "Eric",
    email: "eric@gmail.com",
    subject: "Payment Problem",
    message: "I made a payment but my order is not yet confirmed.",
    date: "2026-11-16",
    read: false,
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const unreadCount = messages.filter(
    (message) => !message.read
  ).length;

  const filteredMessages = messages.filter((message) =>
    `${message.name} ${message.email} ${message.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openMessage = (message) => {
    setMessages((previous) =>
      previous.map((item) =>
        item.id === message.id ? { ...item, read: true } : item
      )
    );

    setSelectedMessage(message);
  };

  const deleteMessage = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((previous) =>
        previous.filter((message) => message.id !== id)
      );

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Messages
            </h1>
            <p className="text-gray-500 mt-2">
              Manage messages from your customers.
            </p>
          </div>

          <div className="bg-white rounded-xl px-5 py-3 shadow-sm flex items-center gap-3">
            <MessageCircle className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-gray-500">Unread messages</p>
              <h2 className="text-xl font-bold text-gray-800">
                {unreadCount}
              </h2>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <Inbox className="text-blue-600 mb-3" size={25} />
            <p className="text-gray-500 text-sm">Total Messages</p>
            <h2 className="text-2xl font-bold">{messages.length}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <Mail className="text-orange-500 mb-3" size={25} />
            <p className="text-gray-500 text-sm">Unread</p>
            <h2 className="text-2xl font-bold">{unreadCount}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <CheckCircle className="text-green-600 mb-3" size={25} />
            <p className="text-gray-500 text-sm">Read Messages</p>
            <h2 className="text-2xl font-bold">
              {messages.length - unreadCount}
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Messages List */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="p-5 border-b">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={19}
                />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="divide-y">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => openMessage(message)}
                    className={`p-5 cursor-pointer hover:bg-blue-50 transition ${
                      selectedMessage?.id === message.id
                        ? "bg-blue-50"
                        : ""
                    } ${!message.read ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex justify-between gap-3">
                      <div className="flex gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <User className="text-blue-600" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-800">
                            {message.name}
                            {!message.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </h3>

                          <p className="text-sm text-blue-600">
                            {message.subject}
                          </p>

                          <p className="text-sm text-gray-500 truncate mt-1">
                            {message.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <span className="text-xs text-gray-400">
                          {message.date}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete message"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  <Inbox size={40} className="mx-auto mb-3" />
                  No messages found.
                </div>
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            {selectedMessage ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Message Details
                  </h2>
                  <MailOpen className="text-blue-600" size={24} />
                </div>

                <div className="border-b pb-5 mb-5">
                  <h3 className="font-bold text-lg text-gray-800">
                    {selectedMessage.subject}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    From: {selectedMessage.name}
                  </p>

                  <p className="text-sm text-blue-600">
                    {selectedMessage.email}
                  </p>

                  <p className="text-xs text-gray-400 mt-3 flex items-center gap-2">
                    <Clock size={14} />
                    {selectedMessage.date}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Message
                  </h4>

                  <p className="text-gray-600 leading-7">
                    {selectedMessage.message}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="mt-8 flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={18} />
                  Delete Message
                </button>
              </>
            ) : (
              <div className="h-full min-h-64 flex flex-col items-center justify-center text-center">
                <MailOpen size={55} className="text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-700">
                  Select a Message
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Choose a message to read its details.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
