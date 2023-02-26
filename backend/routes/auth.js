const express = require("express");
const { healthCheck, login } = require("../controllers/authController");

const router = express.Router();

router.get("/", healthCheck);
router.post("/login", login);

module.exports = router;
