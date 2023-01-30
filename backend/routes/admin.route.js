const express = require("express");
const {
  generateCredentials,
  updatePassword,
  verifyAdmin,
} = require("../controllers/admin.controller");
const usersRouter = express.Router();

// Admin model
const Admin = require("../models/Admin").Admin;

// Services

// Test route
usersRouter.get("/demo", (req, res) => {
  res.send("hola mundo");
});

// Create credentials
usersRouter.post("/generate", generateCredentials);

//LogIn
usersRouter.post("/login", (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        throw new Error("Admin not found");
      }
      return Admin.login(req.body.password);
    })
    .then((admin) => {
      res.send("Logged in successfully");
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

// change password
usersRouter.put("/update", updatePassword);

// is admin created?
usersRouter.get("/verify", verifyAdmin);

module.exports = usersRouter;
