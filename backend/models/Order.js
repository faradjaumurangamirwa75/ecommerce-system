const db = require("../config/db");

const Order = {
  create: (orderData, callback) => {
    const {
      user_id,
      customer_name,
      phone,
      delivery_address,
      total_amount
    } = orderData;

    const sql = `
      INSERT INTO orders
      (user_id, customer_name, phone, delivery_address, total_amount)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user_id,
        customer_name,
        phone,
        delivery_address,
        total_amount
      ],
      callback
    );
  },

  getAll: (callback) => {
    const sql = `
      SELECT
        orders.*,
        users.full_name,
        users.email
      FROM orders
      JOIN users ON orders.user_id = users.id
      ORDER BY orders.created_at DESC
    `;

    db.query(sql, callback);
  },

  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE orders
      SET status = ?
      WHERE id = ?
    `;

    db.query(sql, [status, id], callback);
  }
};

module.exports = Order;