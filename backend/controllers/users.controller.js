const User = require("../models/User")

let user = {
  name: "pepe",
  lastName: "perez",
  email: "pepe@mail.com",
  password: "12345"
}

// let user = new User({
//   name: "pepe",
//   lastName: "perez",
//   email: "pepe@mail.com",
//   password: "12345"
// })


// user.save((err, document) => {
//   if(err) console.log(err)
//   console.log(document)
// })

let createUser = async(user) => {
  let newUser = new User(user)
  try {
    result = await newUser.save()
    console.log(result)
  } catch (error) {
    console.log(error.message)
  }
}

createUser(user)
