const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const collectionsRoutes = require("./routes/collections");
const itemsRoutes = require("./routes/items");
const commentsRoutes = require("./routes/comments");
const app = express();

mongoose
  .connect(
    `mongodb+srv://degusar:RollingScope@cluster0.ufekb.mongodb.net/collections?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/collections", collectionsRoutes);
app.use("/items", itemsRoutes);
app.use("/comments", commentsRoutes);

module.exports = app;
