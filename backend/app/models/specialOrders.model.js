const mongoose = require("mongoose");
const { type } = require("os");

module.exports = (mongoose) => {
  const specialOrders = mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      itemName: {
        type: String,
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
      status: {
        type: String,
        enum: [
          "canceled",
          "pending_processing",
          "pending_payment",
          "completed",
        ],
        default: "pending_processing",
      },

      buyerEmail: {
        type: String,
        required: false,
      },
      buyerPhoneNumber: {
        type: String,
        required: true,
      },
      buyerFullName: {
        type: String,
        required: true,
      },
      buyerLocation: {
        type: String,
        required: true,
      },
      itemPrice: {
        type: Number,
        required: true,
      },
      itemSize: {
        type: String,
        required: true,
      },
      itemID: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

  specialOrders.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const specialOrder = mongoose.model("specialOrder", specialOrders);
  return specialOrder;
};
