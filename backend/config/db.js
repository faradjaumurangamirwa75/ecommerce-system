const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((error) => {
  if (error) {
    console.error("❌ MySQL connection failed:", error.message);
    return;
  }

  console.log("✅ MySQL database connected successfully!");

  // Test USERS table
  db.query("SELECT 1 FROM users LIMIT 1", (error) => {
    if (error) {
      console.log("❌ users table is not connected:", error.message);
    } else {
      console.log("✅ users table connected successfully!");
    }
  });

  // Test PRODUCTS table
  db.query("SELECT 1 FROM products LIMIT 1", (error) => {
    if (error) {
      console.log("❌ products table is not connected:", error.message);
    } else {
      console.log("✅ products table connected successfully!");
    }
  });

  // Test ORDERS table
  db.query("SELECT 1 FROM orders LIMIT 1", (error) => {
    if (error) {
      console.log("❌ orders table is not connected:", error.message);
    } else {
      console.log("✅ orders table connected successfully!");
    }
  });

  // Test ORDER_ITEMS table
  db.query("SELECT 1 FROM order_items LIMIT 1", (error) => {
    if (error) {
      console.log("❌ order_items table is not connected:", error.message);
    } else {
      console.log("✅ order_items table connected successfully!");
    }
  });
});

module.exports = db;