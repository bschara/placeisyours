const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const SpecialItems = mongoose.Schema(
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
      sizeAndQuantity: [
        {
          size: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: false,
          },
        },
      ],
    },
    { timestamps: true }
  );

  SpecialItems.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const SpecialItem = mongoose.model("specialItem", SpecialItems);
  return SpecialItem;
};
