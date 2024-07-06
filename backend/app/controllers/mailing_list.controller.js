const db = require("../models");
const mailing_list = db.mailing_list;

exports.addEmail = (req, res) => {
  // Validate request

  if (!req.body.email) {
    res.status(400).send({ message: "email is required!" });
    return;
  }
  const email = req.body.email;
  // Create an Order
  const mailingList = new mailing_list({
    email: email,
  });

  // Save Order in the database
  mailingList
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

exports.removeEmail = async (req, res) => {
  const email = req.query.email;
  console.log("email is:   ", email);

  try {
    const removedEmail = await mailing_list.findOneAndDelete({ email });

    if (!removedEmail) {
      return res
        .status(404)
        .json({ error: "Email not found in the mailing list." });
    }

    return res.status(200).json(removedEmail);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to remove email from mailing list." });
  }
};

exports.getAllEmails = (req, res) => {
  mailing_list
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving emails.",
      });
    });
};
