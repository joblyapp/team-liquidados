const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin schema
const adminSchema = new mongoose.Schema({
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
});

//method used for the login route
adminSchema.methods.login = async function (password) {
  const isPasswordValid = await bcrypt.compare(password, this.password_hash);
  if (!isPasswordValid) return Promise.reject(new Error("Invalid password"));

  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//method used for the forgot password route
adminSchema.methods.sendPasswordResetEmail = function (sendgrid) {
  const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const email = {
    to: this.email,
    from: "noreply@yourdomain.com",
    subject: "Password Reset",
    text: `Please use the following link to reset your password:
          http://localhost:3000/reset/${resetToken}`,
    html: `<p>Please use the following link to reset your password:</p>
          <p>http://localhost:3000/reset/${resetToken}</p>`,
  };

  return sendgrid.send(email);
};

adminSchema.statics.resetPassword = async function (password, resetToken) {
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const admin = await this.findOne({ email: decoded.email });
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

module.exports = mongoose.model("Admin", adminSchema);
