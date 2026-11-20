
const db = require("../config/db");

// ======================================
// CREATE ORDER - CUSTOMER
// ======================================
const createOrder = (req, res) => {
  console.log("ORDER DATA RECEIVED:", req.body);

  const {
    user_id,
    customer_name,
    phone,
    delivery_address,
    items
  } = req.body;

  // Validate customer information
  if (
    !user_id ||
    !customer_name?.trim() ||
    !phone?.trim() ||
    !delivery_address?.trim()
  ) {
    return res.status(400).json({
      message: "Please provide all customer information"
    });
  }

  // Validate items
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Your cart is empty"
    });
  }

  // Validate products
  for (const item of items) {
    if (
      !Number.isInteger(Number(item.product_id)) ||
      Number(item.product_id) <= 0 ||
      !Number.isFinite(Number(item.price)) ||
      Number(item.price) <= 0 ||
      !Number.isInteger(Number(item.quantity)) ||
      Number(item.quantity) <= 0
    ) {
      return res.status(400).json({
        message: "Invalid product information",
        invalidItem: item
      });
    }
  }

  // Calculate total amount
  const totalAmount = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  // Insert order
  const orderSql = `
    INSERT INTO orders
    (user_id, customer_name, phone, delivery_address, total_amount)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    orderSql,
    [
      user_id,
      customer_name.trim(),
      phone.trim(),
      delivery_address.trim(),
      totalAmount
    ],
    (error, result) => {
      if (error) {
        console.error("CREATE ORDER ERROR:", error);

        return res.status(500).json({
          message: "Failed to create order",
          error: error.message
        });
      }

      const orderId = result.insertId;

      // Insert order items
      const orderItemsSql = `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES ?
      `;

      const values = items.map(item => [
        orderId,
        Number(item.product_id),
        Number(item.quantity),
        Number(item.price)
      ]);

      db.query(orderItemsSql, [values], (itemError) => {
        if (itemError) {
          console.error("ORDER ITEMS ERROR:", itemError);

          db.query(
            "DELETE FROM orders WHERE id = ?",
            [orderId],
            (deleteError) => {
              if (deleteError) {
                console.error("ORDER CLEANUP ERROR:", deleteError);
              }
            }
          );

          return res.status(500).json({
            message: "Failed to save order products",
            error: itemError.message
          });
        }

        return res.status(201).json({
          success: true,
          message: "Order created successfully!",
          orderId,
          totalAmount
        });
      });
    }
  );
};


// ======================================
// GET ALL ORDERS - ADMIN
// ======================================
const getAllOrders = (req, res) => {
  const sql = `
    SELECT
      orders.*,
      users.full_name,
      users.email
    FROM orders
    JOIN users ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("GET ORDERS ERROR:", error);

      return res.status(500).json({
        message: "Failed to get orders",
        error: error.message
      });
    }

    return res.status(200).json(results);
  });
};


// ======================================
// GET MY ORDERS - CUSTOMER
// ======================================
const getMyOrders = (req, res) => {
  const { user_id } = req.query;

  if (
    !user_id ||
    !Number.isInteger(Number(user_id)) ||
    Number(user_id) <= 0
  ) {
    return res.status(400).json({
      message: "Valid user ID is required"
    });
  }

  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [user_id], (error, results) => {
    if (error) {
      console.error("GET MY ORDERS ERROR:", error);

      return res.status(500).json({
        message: "Failed to get your orders",
        error: error.message
      });
    }

    return res.status(200).json(results);
  });
};


// ======================================
// GET ONE ORDER
// ======================================
const getOrderById = (req, res) => {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id)) {
    return res.status(400).json({
      message: "Invalid order ID"
    });
  }

  const orderSql = `
    SELECT * FROM orders
    WHERE id = ?
  `;

  db.query(orderSql, [id], (error, orders) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to get order",
        error: error.message
      });
    }

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    const itemsSql = `
      SELECT
        order_items.*,
        products.name,
        products.image
      FROM order_items
      JOIN products ON order_items.product_id = products.id
      WHERE order_items.order_id = ?
    `;

    db.query(itemsSql, [id], (itemError, items) => {
      if (itemError) {
        return res.status(500).json({
          message: "Failed to get order items",
          error: itemError.message
        });
      }

      return res.status(200).json({
        order: orders[0],
        items
      });
    });
  });
};


// ======================================
// UPDATE ORDER STATUS - ADMIN
// ======================================
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatus = [
    "pending",
    "confirmed",
    "processing",
    "delivering",
    "delivered",
    "cancelled"
  ];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid order status"
    });
  }

  if (!/^[1-9]\d*$/.test(id)) {
    return res.status(400).json({
      message: "Invalid order ID"
    });
  }

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to update order",
        error: error.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully!"
    });
  });
};


// ======================================
// DELETE ORDER - ADMIN
// ======================================
const deleteOrder = (req, res) => {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id)) {
    return res.status(400).json({
      message: "Invalid order ID"
    });
  }

  db.query(
    "DELETE FROM order_items WHERE order_id = ?",
    [id],
    (itemError) => {
      if (itemError) {
        return res.status(500).json({
          message: "Failed to delete order items",
          error: itemError.message
        });
      }

      db.query(
        "DELETE FROM orders WHERE id = ?",
        [id],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              message: "Failed to delete order",
              error: error.message
            });
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: "Order not found"
            });
          }

          return res.status(200).json({
            success: true,
            message: "Order deleted successfully!"
          });
        }
      );
    }
  );
};


// ======================================
// EXPORT FUNCTIONS
// ======================================
module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
