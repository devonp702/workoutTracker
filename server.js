//server js sets up the connections and routes for the server
//declare variables and packages for setting up the database, controller, routes, and render webpages.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// api routes
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(req.params.id, { $push: {exercises: req.body} }, { new: true })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body.data)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
  .then(dbworkout => {
    res.json(dbworkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/exercise?:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});