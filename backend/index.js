const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
// mongoose.connect("mongodb://localhost/your_db_name", { useNewUrlParser: true });
// const db = mongoose.connection;

// Error handling for MongoDB connection
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });

// Middleware
app.use(express.json());

// Routes
// app.use("/", require("./routes/index"));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
