const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const upload = require("../middleware/upload");

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
    res
      .header("Authorization", `Bearer ${token}`)
      .send({ name: admin.name, token, image: admin.image.path });
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

//route use for the edit profile Modal (it does not patch the password)
router.patch("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const email = req.body.email;
    const name = req.body.name;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).send("Admin user not found.");
    }
    if (name) {
      admin.name = name;
    }
    if (email) {
      admin.email = email;
    }
    if (req.file) {
      // check if an image file was uploaded
      admin.image = {
        path: req.file.path,
        contentType: req.file.mimetype,
      };
    }
    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
