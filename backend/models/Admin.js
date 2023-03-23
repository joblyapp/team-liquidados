const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Admin schema
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "admin",
  },

  email: {
    type: String,
    required: true,
  },

  password_hash: {
    type: String,
    required: true,
  },
  image: {
    path: String, // holds the image path
    contentType: String, // holds the MIME type of the image
  },
});

//method used for the login route
AdminSchema.methods.login = async function (password) {
  const isPasswordValid = await bcrypt.compare(password, this.password_hash);
  if (!isPasswordValid) return Promise.reject(new Error("Invalid password"));

  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//method used for the forgot password route
AdminSchema.methods.sendPasswordResetEmail = function () {
  const resetPasswordToken = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const resetPasswordLink = `http://localhost:3000/reset-password/${resetPasswordToken}`;

  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "donventurastore@hotmail.com",
      pass: process.env.HOTMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "donventurastore@hotmail.com",
    to: this.email,
    subject: "Password Reset",
    html: `<body>
    <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Password Recovery</h1>
    <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
    <p style="font-size: 16px; margin-bottom: 20px;">We received a request to reset the password for your account. If you did not initiate this request, please disregard this email.</p>
    <p style="font-size: 16px; margin-bottom: 20px;">To reset your password, please click the button below:</p>
    <table style="margin: auto;">
      <tr>
        <td style="background-color: #5c5c5c; padding: 15px 30px; border-radius: 4px;">
          <a href="${resetPasswordLink}" style="color: #ffffff; font-size: 16px; text-decoration: none;">Reset Password</a>
        </td>
      </tr>
    </table>
    <p style="font-size: 16px; margin-top: 20px;">This link will be valid for 1 Hour.</p>
    <p style="font-size: 16px; margin-top: 20px;">If you continue to have trouble, please reach out to us at donventurastore@hotmail.com.</p>
    <p style="font-size: 16px; margin-top: 20px;">Best regards,</p>
    <p style="font-size: 16px; margin-top: 20px;">The Team at Don Ventura Store</p>
  </body>`,
  };

  return transporter.sendMail(mailOptions);
};

AdminSchema.statics.resetPassword = async function (password, resetToken) {
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const admin = await this.findOne({ _id: decoded._id });
    if (!admin) {
      return { error: "No account with that email exists." };
    }

    admin.password_hash = await bcrypt.hash(password, 10);
    await admin.save();
    return { message: "Password reset successful." };
  } catch (error) {
    return { error };
  }
};

module.exports = mongoose.model("admins", AdminSchema);
