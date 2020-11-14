//server js sets up the connections and routes for the server
//declare variables and packages for setting up the database, controller, routes, and render webpages.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

/* create paths here */
//api
//html

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
