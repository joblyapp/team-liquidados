require("dotenv").config();
const mongoose = require("mongoose");
const Sales = require("../models/sale");
const salesData = require("./sales-data.json");

mongoose.connect(process.env.DB_CONNECTOR, { useNewUrlParser: true });

async function seedSales() {
  try {
    await Sales.deleteMany();
    console.log("Sales data cleared.");

    const sales = await Sales.create(salesData);
    console.log(`${sales.length} sales records seeded`);

    mongoose.connection.close();
  } catch (err) {
    console.log("Error seeding sales data:", err);
  }
}

seedSales();
