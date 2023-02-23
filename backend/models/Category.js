const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
