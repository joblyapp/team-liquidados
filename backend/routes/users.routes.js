const express = require("express")
const usersRouter = express.Router()

// Services

// Test route
usersRouter.get("/demo", (req, res) => {
  res.send("hola mundo")
})

// Create user
usersRouter.put("/demo", (req, res) => {
  res.send("hola mundo")
})


module.exports = usersRouter