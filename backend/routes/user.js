const express = require("express");
const { isAdmin } = require("../controllers/authController");
const {
  middleware,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

// Middleware
router.param("user_id", middleware);

// Routes
router.get("/:user_id", isAdmin, getUsers);
router.post("/", createUser);
router.get("/:user_id", getUser);
router.put("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);

// Exports
module.exports = router;
