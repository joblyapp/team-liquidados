const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
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
  paymentForm: {
    type: String,
    enum: ["Debit", "Credit", "Cash"],
    required: true,
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false,
  },
  cancellationReason: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
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

SalesSchema.statics.cancelSale = async function (saleId, cancellationReason) {
  try {
    const sale = await this.findByIdAndUpdate(
      saleId,
      { isCancelled: true, cancellationReason },
      { new: true }
    );
    return sale;
  } catch (error) {
    throw new Error("Unable to cancel sale");
  }
};

module.exports = mongoose.model("Sales", SalesSchema);
