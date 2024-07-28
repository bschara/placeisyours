const db = require("../models");
const Answer = db.answers;

exports.create = (req, res) => {
  if (!req.body.answer) {
    res.status(400).send({ message: "answer is required!" });
    return;
  }

  const answer = req.body.answer;
  const ans = new Answer({
    text: answer,
  });

  // Save Order in the database
  ans
    .save()
    .then((data) => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the answer.",
      });
    });
};

exports.getAllAnswers = (req, res) => {
  Answer.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving answers.",
      });
    });
};
