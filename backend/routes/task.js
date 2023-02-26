const express = require("express");
const { requireSignin } = require("../controllers/authController");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  middleware,
} = require("../controllers/taskController");

const router = express.Router();

// Middleware
router.param("task_id", middleware);

// Routes
router.get("/", requireSignin, getTasks);
router.post("/", createTask);
router.get("/:task_id", getTask);
router.put("/:task_id", updateTask);
router.delete("/:task_id", deleteTask);

// Exports
module.exports = router;
