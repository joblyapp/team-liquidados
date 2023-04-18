require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
//authentication function
const authenticateJWT = require("./middleware/auth");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTOR, { useNewUrlParser: true });

const db = mongoose.connection;

// Error handling for MongoDB connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const productsRoutes = require("./routes/productsRoutes.js");
const salesRoutes = require("./routes/SalesRoutes.js");
const adminsRoutes = require("./routes/adminsRoutes.js");
const countersRoutes = require("./routes/counterRoutes.js");
const categoriesRoutes = require("./routes/categoriesRoutes.js");

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// Routes
app.use("/products", authenticateJWT, productsRoutes);
app.use("/sales", authenticateJWT, salesRoutes);
app.use("/counter", authenticateJWT, countersRoutes);
app.use("/category", authenticateJWT, categoriesRoutes);
app.use("/admin", adminsRoutes);
app.use("/uploads", express.static("./uploads")); //used to serve the pictures

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
