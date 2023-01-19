require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTOR, { useNewUrlParser: true })

const db = mongoose.connection

// Error handling for MongoDB connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
console.log("Connected to MongoDB")
})

// Middleware
app.use(express.json())
app.use(morgan("tiny"))

// Routes
// app.use("/", require("./routes/index"));
app.use("/api/v1", require("./routes/index"))

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
