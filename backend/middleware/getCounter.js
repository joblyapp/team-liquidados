const Counter = require("../models/Counter");

async function getNextSequenceValue(sequenceName) {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, useFindAndModify: false }
    );
    return counter.seq;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting next sequence value");
  }
}

module.exports = getNextSequenceValue;
