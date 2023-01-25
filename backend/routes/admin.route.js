const express = require("express")
const {
  generateCredentials,
  updatePassword,
} = require("../controllers/admin.controller")
const usersRouter = express.Router()

// Admin model
const Admin = require("../models/Admin").Admin

// Services

// Test route
usersRouter.get("/demo", (req, res) => {
  res.send("hola mundo")
})

// Create credentials
usersRouter.post("/generate", generateCredentials)

// change password

usersRouter.put("/update", updatePassword)

module.exports = usersRouter
