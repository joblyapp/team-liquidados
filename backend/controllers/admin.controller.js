const Admin = require("../models/Admin").Admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const JWT_SECRET = process.env.JWT_SECRET;

// Create new credentials with email and password
const generateCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newAdminCredentials = new Admin({
      email: email,
    });

    let hashedPassword = await newAdminCredentials.createHash(password);
    newAdminCredentials.password_hash = hashedPassword;

    await newAdminCredentials.save();

    return res.status(201).json({
      message: "Admin credentials created",
    });
  } catch (error) {
    res.send(error.message);
  }
};

const verifyAdmin = async (req, res) => {
  try {
    let isAdminCreated = await Admin.findOne({ name: "admin" });
    if (isAdminCreated) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    res.send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let isEmailCreated = await Admin.findOne({ email: email });
    if (!isEmailCreated) {
      res.json({
        message: "User not registered",
      });
      return;
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
  } catch (error) {
    res.send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const secret = JWT_SECRET;

  try {
    const payload = jwt.verify(token, secret);
    const adminUser = await Admin.findOne({ name: payload.name });
    const { name, email } = adminUser;

    if (name === payload.name && email === payload.email) {
      let hash = await bcrypt.hash(password, 10);
      await Admin.updateOne(
        {
          name: name,
        },
        { $set: { password_hash: hash } },
        { new: true }
      );
    }

    res.json({ message: "password update successfully" });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  generateCredentials,
  verifyAdmin,
  forgotPassword,
  resetPassword,
};
