const Admin = require("../models/Admin").Admin

// Create new credentials with email and password
const generateCredentials = async (req, res) => {
  try {
    const { email, password } = req.body

    const newAdminCredentials = new Admin({
      email: email,
    })

    let hashedPassword = await newAdminCredentials.createHash(password)
    newAdminCredentials.password_hash = hashedPassword

    await newAdminCredentials.save()

    return res.status(201).json({
      message: "Admin credentials created",
    })
  } catch (error) {
    res.send(error.message)
  }
}

const updatePassword = async (req, res) => {
  res.send("hola mundo")
}

module.exports = { generateCredentials, updatePassword }
