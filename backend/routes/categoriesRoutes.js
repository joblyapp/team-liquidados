const express = require("express");
const router = express.Router();

//Model
const Category = require("../models/Category");

//Function to get the Counter
const getNextSequenceValue = require("../middleware/getCounter");

// Get all Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create a new Category
router.post("/", async (req, res) => {
  const nextSequenceValue = await getNextSequenceValue("category");

  const newCategory = new Category({
    number: nextSequenceValue,
    name: req.body.name,
  });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
