const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const sendgrid = require("@sendgrid/mail");

const Admin = require("../models/Admin");

//Route for creating a new admin
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
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
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send("Email not found");

    const token = await admin.login(req.body.password);
    res.header("Authorization", `Bearer ${token}`).send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ error: "No account with that email exists." });
    }

    await admin.sendPasswordResetEmail(sendgrid);
    return res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    return res.status(500).json({ error });
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
