const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const Model = mongoose.model;
const User = Model("Users", UserSchema);

module.exports = User;
