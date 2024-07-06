const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const Orders = mongoose.Schema(
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
        required: true,
      },
      buyerPhoneNumber: {
        type: String,
        required: true,
      },
      buyerFullName: {
        type: String,
        required: true,
      },
      itemPrice: {
        type: Number,
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

  Orders.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model("Order", Orders);
  return Order;
};
