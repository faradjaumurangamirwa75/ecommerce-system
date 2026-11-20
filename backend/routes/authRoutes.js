
const express = require("express");
const router = express.Router();

// Import Authentication Controller
const authController = require("../controllers/authController");

// Check Controller Functions
if (
  typeof authController.register !== "function" ||
  typeof authController.login !== "function"
) {
  throw new Error(
    "Auth Controller Error: register or login function is missing."
  );
}

// CUSTOMER REGISTRATION
router.post("/register", authController.register);

// ADMIN AND CUSTOMER LOGIN
router.post("/login", authController.login);

// EXPORT ROUTER
module.exports = router;
