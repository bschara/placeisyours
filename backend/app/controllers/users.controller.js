const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
require("dotenv").config();

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "All fields are required!" });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // Create a User
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email and password are required!" });
    return;
  }

  // Find user by email
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid password!" });
      }

      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      // Send response with token
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred during login.",
      });
    });
};
