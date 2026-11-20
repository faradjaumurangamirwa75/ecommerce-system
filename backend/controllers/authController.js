
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==================================
// CUSTOMER REGISTER
// ==================================
const register = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters"
      });
    }

    const cleanName = full_name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    db.query(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail],
      async (error, results) => {
        if (error) {
          console.error("Register database error:", error);
          return res.status(500).json({
            success: false,
            message: "Database error"
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Email already exists"
          });
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          const sql = `
            INSERT INTO users
            (full_name, email, phone, password, role)
            VALUES (?, ?, ?, ?, 'customer')
          `;

          db.query(
            sql,
            [cleanName, cleanEmail, cleanPhone, hashedPassword],
            (insertError, result) => {
              if (insertError) {
                console.error("Insert error:", insertError);
                return res.status(500).json({
                  success: false,
                  message: "Failed to register customer"
                });
              }

              return res.status(201).json({
                success: true,
                message: "Customer registered successfully",
                userId: result.insertId
              });
            }
          );
        } catch (err) {
          console.error("Hash error:", err);
          return res.status(500).json({
            success: false,
            message: "Password processing failed"
          });
        }
      }
    );
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ==================================
// LOGIN CUSTOMER / ADMIN
// ==================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error"
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const sql = `
      SELECT id, full_name, email, phone, password, role
      FROM users
      WHERE email = ?
      LIMIT 1
    `;

    db.query(sql, [cleanEmail], async (error, results) => {
      if (error) {
        console.error("Login database error:", error);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      try {
        const user = results[0];

        const isMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password"
          });
        }

        const token = jwt.sign(
          {
            id: user.id,
            role: user.role
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            role: user.role
          }
        });
      } catch (err) {
        console.error("Login error:", err);

        return res.status(500).json({
          success: false,
          message: "Login failed"
        });
      }
    });
  } catch (error) {
    console.error("Server login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  register,
  login
};
