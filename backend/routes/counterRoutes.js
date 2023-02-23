const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");

// POST /counters
router.post("/", (req, res) => {
  const { name, value } = req.body;
  const newCounter = new Counter({ _id: name, seq: value });
  newCounter
    .save()
    .then((counter) => {
      res.status(201).json(counter);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error creating new counter");
    });
});

module.exports = router;
