const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    select: true,
    immutable: true,
  },
});

module.exports = mongoose.model("Sales", SalesSchema);
