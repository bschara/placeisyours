const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const Answers = mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  Answers.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Answer = mongoose.model("Answer", Answers);
  return Answer;
};
