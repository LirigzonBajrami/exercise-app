require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();
const exerciseRoutes = require("./routes/exerciseRoutes");
const userRoutes = require("./routes/user");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/exercises/", exerciseRoutes);
app.use("/api/users/", userRoutes);

// conntect to mongoDb & listen for requests
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Success connection!");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
