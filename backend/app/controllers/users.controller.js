const db = require("../models");
const User = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phoneNumber ||
    !req.body.address
  ) {
    res.status(400).send({ message: "All fields are required!" });
    return;
  }

  // Create a User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    address: req.body.address,
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
