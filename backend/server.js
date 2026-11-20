
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const app = express();

// ===============================
// IMPORT ROUTES
// ===============================
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const messageRoutes = require("./routes/messageRoutes");

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// SERVE UPLOADED IMAGES
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// HOME ROUTE
// ===============================
app.get("/", (req, res) => {
  res.status(200).send("Faradja Store API is running successfully!");
});

// ===============================
// PRODUCTS API
// ===============================
app.use("/api/products", productRoutes);

// ===============================
// AUTHENTICATION API
// ===============================
app.use("/api/auth", authRoutes);

// ===============================
// ORDERS API
// ===============================
app.use("/api/orders", orderRoutes);

// ===============================
// MESSAGES API
// ===============================
app.use("/api/messages", messageRoutes);

// ===============================
// TEST ROUTES
// ===============================
app.get("/api/auth/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Faradja Store Authentication API is working!"
  });
});

app.get("/api/orders/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Faradja Store Orders API is working!"
  });
});

app.get("/api/messages/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Faradja Store Messages API is working!"
  });
});

// ===============================
// 404 ROUTE
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// ===============================
// SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("--------------------------------");
  console.log("Faradja Store server connected successfully!");
  console.log(`Server running on port ${PORT}`);
  console.log("--------------------------------");

  console.log("PRODUCT ROUTES LOADED SUCCESSFULLY");
  console.log("AUTH ROUTES LOADED SUCCESSFULLY");
  console.log("ORDER ROUTES LOADED SUCCESSFULLY");
  console.log("MESSAGE ROUTES LOADED SUCCESSFULLY");
});
