const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authContoller = require("./controllers/authContoller");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadContoller");

const app = express(); //initialize our backend application

// mongoose.connect(process.env.MONGO_URL, () =>
//   console.log("Successfully connected to mongoDB database")
// );

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//middleware
app.use(cors());
app.use(express.json()); //allow backend to accept data from request . query (from client body)
app.use(express.urlencoded({ extended: true })); //allows only forms but function as expree.json

//too serve images inside public folder
app.use("/images", express.static("public/images"));

app.use("/auth", authContoller);
app.use("/products", productController);
app.use("/upload", uploadController);

app.listen(process.env.PORT, () =>
  console.log("Server has been started successfully")
); //connect our backend application
