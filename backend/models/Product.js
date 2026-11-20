const db = require("../config/db");

const Product = {
  getAll: (callback) => {
    db.query(
      "SELECT * FROM products ORDER BY id DESC",
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      "SELECT * FROM products WHERE id = ?",
      [id],
      callback
    );
  },

  create: (product, callback) => {
    const {
      name,
      description,
      price,
      stock,
      category,
      image
    } = product;

    const sql = `
      INSERT INTO products
      (name, description, price, stock, category, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, description, price, stock, category, image],
      callback
    );
  },

  update: (id, product, callback) => {
    const {
      name,
      description,
      price,
      stock,
      category,
      image
    } = product;

    const sql = `
      UPDATE products
      SET name = ?, description = ?, price = ?,
          stock = ?, category = ?, image = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        name,
        description,
        price,
        stock,
        category,
        image,
        id
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(
      "DELETE FROM products WHERE id = ?",
      [id],
      callback
    );
  }
};

module.exports = Product;