const { Schema, model } = require("mongoose")

const bcrypt = require("bcrypt")

// Admin schema
const AdminSchema = new Schema({
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
})

// Generate Password Hash

AdminSchema.methods.createHash = async plainTextPassword => {
  try {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainTextPassword, salt)
  } catch (error) {
    console.log(error.message)
  }
}

// Validate password

// AdminSchema.methods.createHash = async (adminPassword, password_hash) => {
//   const result = await bcrypt.compare(adminPassword, password_hash)
//   return result

//   try {
//   } catch (error) {}
// }

AdminSchema.methods.hello = async () => {
  console.log("holaaa")
}

AdminSchema.methods.verifyAdmin = async () => {
  return true
}

module.exports.Admin = model("Admin", AdminSchema, "admin")
