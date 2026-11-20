
const db = require("../config/db");

// GET ALL PRODUCTS
const getProducts = (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to get products",
        error: error.message
      });
    }

    res.status(200).json(results);
  });
};

// GET ONE PRODUCT
const getProductById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to get product",
        error: error.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(results[0]);
  });
};

// ADD PRODUCT
const addProduct = (req, res) => {
  const { name, description, price, stock, category, image } = req.body;

  if (!name || !price || stock === undefined || !category) {
    return res.status(400).json({
      message: "Please provide all required fields"
    });
  }

  // Upload image takes priority; otherwise use image URL
  const imagePath = req.file
    ? `/uploads/${req.file.filename}`
    : (image || null);

  const sql = `
    INSERT INTO products
    (name, description, price, stock, category, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, stock, category, imagePath],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to add product",
          error: error.message
        });
      }

      res.status(201).json({
        message: "Product added successfully!",
        productId: result.insertId,
        image: imagePath
      });
    }
  );
};

// UPDATE PRODUCT
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, image } = req.body;

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
      req.file ? `/uploads/${req.file.filename}` : (image || null),
      id
    ],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to update product",
          error: error.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.json({
        message: "Product updated successfully!"
      });
    }
  );
};

// DELETE PRODUCT
const deleteProduct = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to delete product",
        error: error.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully!"
    });
  });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
