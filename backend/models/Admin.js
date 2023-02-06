const mongoose = require("mongoose");

// Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "admin",
  },

  email: {
    type: String,
    required: true,
  },

  password_hash: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
