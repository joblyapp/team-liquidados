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
    immutable: true,
  },
});

//A method to get sales for a period of time
SalesSchema.statics.getSalesBetweenDates = function (
  startDate,
  endDate,
  callback
) {
  return this.find(
    {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    },
    callback
  );
};

module.exports = mongoose.model("Sales", SalesSchema);
