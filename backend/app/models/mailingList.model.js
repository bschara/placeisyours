const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const MailingList = mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

  MailingList.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const mailing_list = mongoose.model("mailing_list", MailingList);
  return mailing_list;
};
