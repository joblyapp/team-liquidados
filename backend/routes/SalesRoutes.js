const express = require("express");
const router = express.Router();
const Sales = require("../models/Sale");

// Create a sale
router.post("/", async (req, res) => {
  const { products, total } = req.body;

  try {
    const sale = new Sales({ products, total });
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//statistics
router.post("/statistics", function (req, res) {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  Sales.getSalesBetweenDates(startDate, endDate, function (err, sales) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(sales);
  });
});

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find().populate("products.productId");
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one sale
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id).populate(
      "products.productId"
    );
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a sale
router.patch("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    const { products, total } = req.body;
    sale.products = products;
    sale.total = total;
    await sale.save();
    res.json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a sale
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    await sale.remove();
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
