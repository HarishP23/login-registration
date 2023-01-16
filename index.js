const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const mongoose = require("mongoose");
const User = require("./models/Users");
const bodyParser = require("body-parser");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/usersDB");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    email: email,
    password: password,
  });

  newUser.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Successfully Created User");
    }
  });
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, foundResult) => {
    if (err) {
      console.log(err);
    } else {
      if (foundResult !== null && foundResult.password === password) {
        res.send("You are Logged in!!");
      } else {
        res.send("Incorrect Email Or Password.");
      }
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started On port 3000");
});
