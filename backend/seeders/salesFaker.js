require("dotenv").config();
const { faker } = require("@faker-js/faker");
const Sales = require("../models/Sale");
const mongoose = require("mongoose");

const getNextSequenceValue = require("../middleware/getCounter");

const paymentOptions = ["Debito", "Credito", "Efectivo"];

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://ventura-admin:U1XgEOPsL4sJ639t@cluster0.nrwu6qq.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

// Error handling for MongoDB connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// const nextSequenceValue = await getNextSequenceValue("sales");

// async function generateSales() {
//   for (let i = 50; i < 100; i++) {
//     const products = [];
//     const numProducts = faker.datatype.bigInt({ min: 1, max: 5 });
//     for (let j = 0; j < numProducts; j++) {
//       const product = {
//         name: faker.commerce.productName(),
//         price: faker.commerce.price(),
//         quantity: faker.datatype.number({ min: 1, max: 10 }),
//       };
//       products.push(product);
//     }

//     const total = faker.commerce.price();
//     const date = faker.date.between("2021-01-01", "2023-03-07");
//     const paymentForm =
//       paymentOptions[faker.datatype.number(paymentOptions.length - 1)];
//     const isCancelled = faker.datatype.boolean();
//     const cancellationReason = isCancelled ? faker.lorem.sentence() : undefined;
//     const number = faker.datatype.number({ min: 100000, max: 999999 });

//     // Create a new sale
//     const sale = new Sales({
//       products,
//       total,
//       date,
//       paymentForm,
//       isCancelled,
//       cancellationReason,
//       number,
//     });

//     console.log(sale);

//     // Save the sale to the database
//     await sale.save();
//   }
// }

async function generateSales() {
  for (let i = 0; i < 1000; i++) {
    const products = [];
    let totalPrice = 0; // Initialize totalPrice variable to 0
    const numProducts = faker.datatype.bigInt({ min: 1, max: 5 });
    for (let j = 0; j < numProducts; j++) {
      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.datatype.number({ min: 1, max: 10 }),
      };
      products.push(product);
      totalPrice += parseFloat(product.price); // Add the price of each product to totalPrice
    }

    const date = faker.date.between("2021-01-01", "2023-03-07");
    const paymentForm =
      paymentOptions[faker.datatype.number(paymentOptions.length - 1)];
    const isCancelled = faker.datatype.boolean();
    const cancellationReason = isCancelled ? faker.lorem.sentence() : undefined;
    const number = faker.datatype.number({ min: 100000, max: 999999 });

    // Create a new sale with the updated total
    const sale = new Sales({
      products,
      total: totalPrice.toFixed(2), // Set total to the sum of all product prices, formatted to 2 decimal places
      date,
      paymentForm,
      isCancelled,
      cancellationReason,
      number,
    });

    console.log(sale);

    // Save the sale to the database
    await sale.save();
  }
}

generateSales();
