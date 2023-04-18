const express = require("express");
const router = express.Router();

//Model
const Category = require("../models/Category");
const Product = require("../models/Product");

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

// Deletes a category by ID
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Check if there are any products with this category
    const productsWithCategory = await Product.find({ category: categoryId });

    if (productsWithCategory.length > 0) {
      return res.status(400).json({
        message: "Cannot delete because there are products with this category",
      });
    }

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
