const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Admin = require("../models/Admin");

const JWT_SECRET = process.env.JWT_SECRET;

// Route for admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const admin = await Admin.findOne({ email: email });
    console.log(admin);
    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Successfully logged in",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Route for handling password reset
router.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    const secret = JWT_SECRET;
    const payload = {
      name: "admin",
      email: email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:8080/api/v1/admin/reset/${token}`;
    //email sent using sendgrid
    const msg = {
      to: email,
      from: "example@example.com",
      subject: "Password Reset",
      text: "Follow the link to reset your password: " + link,
    };

    await sgMail.send(msg);
    res.send({ message: "Email sent successfully" });
    //----------------------

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
