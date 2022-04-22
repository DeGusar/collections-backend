const express = require("express");
const authRoutes = require("./routes/auth");
const collectionsRoutes = require("./routes/collections");
const itemsRoutes = require("./routes/items");
const commentsRoutes = require("./routes/comments");
const app = express();

app.use("/auth", authRoutes);
app.use("/collections", collectionsRoutes);
app.use("/items", itemsRoutes);
app.use("/comments", commentsRoutes);

module.exports = app;
