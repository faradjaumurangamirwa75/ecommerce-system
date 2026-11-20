
const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

// ======================================
// CUSTOMER CREATES ORDER
// ======================================
router.post("/", createOrder);

// ======================================
// CUSTOMER GETS THEIR ORDERS
// IMPORTANT: MUST COME BEFORE /:id
// ======================================
router.get("/my-orders", getMyOrders);

// ======================================
// ADMIN GETS ALL ORDERS
// ======================================
router.get("/", getAllOrders);

// ======================================
// GET ONE ORDER
// ======================================
router.get("/:id", getOrderById);

// ======================================
// ADMIN UPDATES ORDER STATUS
// ======================================
router.put("/:id/status", updateOrderStatus);

// ======================================
// ADMIN DELETES ORDER
// ======================================
router.delete("/:id", deleteOrder);

module.exports = router;
