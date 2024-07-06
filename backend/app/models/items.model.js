const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const Items = mongoose.Schema(
    {
      ID: {
        type: String,
        required: true,
        unique: true,
      },
      itemName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      mainImage: {
        type: String,
        required: true,
      },
      images: [String],

      description: {
        type: String,
        required: false,
      },
      size: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["available", "sold"],
        default: "available",
      },
    },
    { timestamps: true }
  );

  Items.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Item = mongoose.model("Item", Items);
  return Item;
};
