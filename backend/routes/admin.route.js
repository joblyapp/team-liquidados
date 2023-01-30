const express = require("express")
const {
  generateCredentials,
  updatePassword,
  verifyAdmin,
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

// is admin created?
usersRouter.get("/verify", verifyAdmin)

module.exports = usersRouter
