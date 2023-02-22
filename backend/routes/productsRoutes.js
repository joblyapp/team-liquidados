const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fs = require("fs");

//Models
const Product = require("../models/Product"); // import the product model

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id); // find the product by its id
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

//All Routes

//Getting all
router.get("/", async (req, res) => {
  try {
    console.log(upload);
    const products = await Product.find(); // get all products from the database
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message }); // return an error message
  }
});

//Getting one
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // find the product by its id
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message }); // return an error message
  }
});

//Creating one

router.post("/", upload.single("image"), async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    },
  });
  try {
    await newProduct.save(); // save the product to the database
    res.status(201).json(newProduct); // return the new product
  } catch (err) {
    res.status(400).json({ message: err.message }); // return an error message
  }
});

// Updating one
router.patch("/:id", getProduct, upload.single("image"), async (req, res) => {
  // if (req.body.name != null) {
  //   res.product.name = req.body.name;
  // }
  // if (req.body.category != null) {
  //   res.product.category = req.body.category;
  // }
  // if (req.body.description != null) {
  //   res.product.description = req.body.description;
  // }
  // if (req.body.price != null) {
  //   res.product.price = req.body.price;
  // }
  // if (req.body.image != null) {
  //   res.product.image = req.body.image;
  // }

  // Update product fields
  res.product.name = req.body.name || res.product.name;
  res.product.description = req.body.description || res.product.description;
  res.product.category = req.body.category || res.product.category;
  res.product.price = req.body.price || res.product.price;

  // Check if image was uploaded
  if (req.file) {
    res.product.image = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    };
  }

  try {
    const updatedProduct = await res.product.save(); // save the updated product
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message }); // return an error message
  }
});

//Deactivate a product
router.patch("deactivate/:id", async (req, res) => {
  try {
    const updatedField = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { active: req.body.active } },
      { new: true }
    );
    res.json(updatedField);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Deliting one
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.remove(); // delete the product from the database
    res.json({ message: "Deleted Product" });
  } catch (err) {
    res.status(500).json({ message: err.message }); // return an error message
  }
});

module.exports = router;
