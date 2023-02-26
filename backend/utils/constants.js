require("dotenv").config();

const HTTP_PORT = process.env.HTTP_PORT;
const MONGO_URI = process.env.MONGO_URI;
const FE_ORIGIN = process.env.FE_ORIGIN;
const TASK_STATUS = ["To Do", "In Progress", "Complete"];
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  HTTP_PORT,
  MONGO_URI,
  TASK_STATUS,
  FE_ORIGIN,
  JWT_SECRET,
};
