const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Admin = require("../models/Admin");

//Route for creating a new admin
router.post("/", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    const salt = await bcrypt.genSalt(10);
    admin.password_hash = await bcrypt.hash(req.body.password, salt);
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for admin login

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send("Email not found");

    const token = await admin.login(req.body.password);
    res.header("Authorization", `Bearer ${token}`).send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//route for forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    await admin.sendPasswordResetEmail();

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route for handling password reset
router.post("/reset", async (req, res) => {
  const { password, resetToken } = req.body;

  const response = await Admin.resetPassword(password, resetToken);

  if (response.error) {
    return res.status(400).json({ error: response.error });
  }

  return res.json({ message: response.message });
});

module.exports = router;
