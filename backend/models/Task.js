const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  name: String,
  status: String,
  board: String,
  owner_id: String,
});

const Model = mongoose.model;
const Task = Model("Tasks", TaskSchema);

module.exports = Task;
