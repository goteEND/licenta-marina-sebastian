const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "student"
  },
  date: {
    type: Date,
    default: Date.now
  },
  profesor: { type: String },
  year: { type: String }
});

module.exports = User = mongoose.model("users", UserSchema);
