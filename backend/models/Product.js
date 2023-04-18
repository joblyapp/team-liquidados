const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  DateOfEntry: {
    type: Date,
    required: true,
    default: Date.now,
  },
  image: {
    path: String, // holds the image path
    contentType: String, // holds the MIME type of the image
  },
  number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
