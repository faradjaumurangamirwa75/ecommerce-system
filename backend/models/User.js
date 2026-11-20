const jwt = require("jsonwebtoken");


// ================================
// VERIFY USER TOKEN
// ================================
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token. Authorization denied."
      });
    }

    // Get token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save user information
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};


// ================================
// ADMIN ONLY
// ================================
const adminOnly = (req, res, next) => {

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }

  next();
};


module.exports = {
  protect,
  adminOnly
};