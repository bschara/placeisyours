const db = require("../models");
const Order = db.orders;
const Item = db.items;
const SpecialOrder = db.specialOrder;
const sItem = db.sItem;
const uuid = require("uuid");
const mongoose = require("mongoose");
const axios = require("axios");
const { verifyRecaptcha } = require("../utils/recaptcha-operations");

// exports.create = async (req, res) => {
//   if (
//     !req.body.itemName ||
//     !req.body.category ||
//     !req.body.mainImage ||
//     !req.body.buyerEmail ||
//     !req.body.buyerPhoneNumber ||
//     !req.body.itemPrice ||
//     !req.body.buyerFullName ||
//     !req.body.buyerLocation
//   ) {
//     res.status(400).send({ message: "All fields are required!" });
//     return;
//   }

//   const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);

//   if (!isRecaptchaValid) {
//     return res.status(400).send({ message: "reCAPTCHA verification failed." });
//   }

//   const id = uuid.v4();

//   // Create an Order
//   const order = new Order({
//     id: id,
//     itemName: req.body.itemName,
//     category: req.body.category,
//     mainImage: req.body.mainImage,
//     buyerEmail: req.body.buyerEmail,
//     buyerPhoneNumber: req.body.buyerPhoneNumber,
//     buyerFullName: req.body.buyerFullName,
//     buyerLocation: req.body.buyerLocation,
//     itemPrice: req.body.itemPrice,
//     itemID: req.body.itemID,
//   });

//   // Save Order in the database
//   order
//     .save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the Order.",
//       });
//     });
// };
// Retrieve all Orders from the database.

exports.create = async (req, res) => {
  if (
    !req.body.itemName ||
    !req.body.category ||
    !req.body.mainImage ||
    !req.body.buyerPhoneNumber ||
    !req.body.itemPrice ||
    !req.body.buyerFullName ||
    !req.body.buyerLocation ||
    !req.body.itemID
  ) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  const recaptchaToken = req.body.recaptchaToken;
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (!isRecaptchaValid) {
    return res.status(400).send({ message: "reCAPTCHA verification failed." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const id = uuid.v4();

    const order = new Order({
      ID: id,
      itemName: req.body.itemName,
      category: req.body.category,
      mainImage: req.body.mainImage,
      buyerEmail: req.body.buyerEmail,
      buyerPhoneNumber: req.body.buyerPhoneNumber,
      buyerFullName: req.body.buyerFullName,
      buyerLocation: req.body.buyerLocation,
      itemPrice: req.body.itemPrice,
      itemID: req.body.itemID,
    });

    await order.save({ session });

    const itemId = req.body.itemID;
    await Item.findOneAndUpdate(
      { ID: itemId },
      { status: "sold" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).send(order);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.createSpecialItem = async (req, res) => {
  if (
    !req.body.itemName ||
    !req.body.category ||
    !req.body.mainImage ||
    !req.body.buyerPhoneNumber ||
    !req.body.itemPrice ||
    !req.body.buyerFullName ||
    !req.body.buyerLocation ||
    !req.body.itemID ||
    !req.body.itemSize
  ) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  const recaptchaToken = req.body.recaptchaToken;
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (!isRecaptchaValid) {
    return res.status(400).send({ message: "reCAPTCHA verification failed." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const id = uuid.v4();

    const order = new SpecialOrder({
      ID: id,
      itemName: req.body.itemName,
      category: req.body.category,
      mainImage: req.body.mainImage,
      buyerEmail: req.body.buyerEmail,
      buyerPhoneNumber: req.body.buyerPhoneNumber,
      buyerFullName: req.body.buyerFullName,
      buyerLocation: req.body.buyerLocation,
      itemPrice: req.body.itemPrice,
      itemID: req.body.itemID,
      itemSize: req.body.itemSize,
    });

    await order.save({ session });

    const itemId = req.body.itemID;
    const size = req.body.itemSize;

    const specialItem = await sItem.findOne({ ID: itemId }).session(session);

    if (!specialItem) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Special Item not found" });
    }

    const sizeAndQuantity = specialItem.sizeAndQuantity.find(
      (sq) => sq.size === size
    );
    if (!sizeAndQuantity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Size not found" });
    }

    if (sizeAndQuantity.quantity < 1) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send({ message: "Not enough quantity available" });
    }

    sizeAndQuantity.quantity -= 1;
    await specialItem.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).send(order);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.findAll = (req, res) => {
  Order.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.findOrdersByPhoneNumber = (req, res) => {
  const phoneNumber = req.query.phoneNumber;

  Order.find({ buyerPhoneNumber: phoneNumber })
    .then((data) => {
      if (!data || data.length === 0)
        res.status(404).send({
          message: "No orders found with phone number " + phoneNumber,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving orders with phone number=" + phoneNumber,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.findOrdersPendingPayment = (req, res) => {
  Order.find({ status: "pending_payment" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving orders pending payment.",
      });
    });
};

exports.findOrdersPendingProcessing = (req, res) => {
  Order.find({ status: "pending_processing" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving orders pending processing.",
      });
    });
};

exports.findSpecialOrdersPendingPayment = (req, res) => {
  SpecialOrder.find({ status: "pending_payment" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving orders pending payment.",
      });
    });
};

exports.findSpecialOrdersPendingProcessing = (req, res) => {
  SpecialOrder.find({ status: "pending_processing" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving orders pending processing.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Order.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.findOrdersByFullName = (req, res) => {
  const fullName = req.query.fullName;

  Order.find({
    buyerFullName: {
      $regex: new RegExp(fullName),
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.findOrdersByEmail = (req, res) => {
  const email = req.query.email;

  Order.find({
    buyerEmail: {
      $regex: new RegExp(email),
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.handlePendingPayment = (req, res) => {
  const itemID = req.body.itemID;

  Order.findOneAndUpdate(
    { itemID: itemID },
    { status: "completed" },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order status updated to completed." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with itemID=" + itemID,
      });
    });
};

exports.handlePendingProcessing = (req, res) => {
  const itemID = req.body.itemID;

  Order.findOneAndUpdate(
    { itemID: itemID },
    { status: "pending_payment" },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order status updated to pending_payement." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with itemID=" + itemID,
      });
    });
};

exports.handleSpecialPendingPayment = (req, res) => {
  const itemID = req.body.itemID;

  SpecialOrder.findOneAndUpdate(
    { itemID: itemID },
    { status: "completed" },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order status updated to completed." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with itemID=" + itemID,
      });
    });
};

exports.handleSpecialPendingProcessing = (req, res) => {
  const itemID = req.body.itemID;

  SpecialOrder.findOneAndUpdate(
    { itemID: itemID },
    { status: "pending_payment" },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order status updated to pending_payement." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with itemID=" + itemID,
      });
    });
};

// exports.handleCancel = (req, res) => {
//   const itemID = req.body.itemID;

//   Order.findOneAndUpdate(
//     { itemID: itemID },
//     { status: "canceled" },
//     { useFindAndModify: false, new: true }
//   )
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
//         });
//       } else res.send({ message: "Order status updated to canceled." });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Order with itemID=" + itemID,
//       });
//     });
// };
//

exports.handleCancel = async (req, res) => {
  const itemID = req.body.itemID;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderUpdate = await Order.findOneAndUpdate(
      { itemID: itemID },
      { status: "canceled" },
      { useFindAndModify: false, new: true, session }
    );

    if (!orderUpdate) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({
        message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
      });
    }

    const itemUpdate = await Item.findOneAndUpdate(
      { ID: itemID },
      { status: "available" },
      { useFindAndModify: false, new: true, session }
    );

    if (!itemUpdate) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({
        message: `Cannot update Item with itemID=${itemID}. Maybe Item was not found!`,
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.send({
      message:
        "Order status updated to canceled and Item status updated to available.",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({
      message: "Error updating Order or Item with itemID=" + itemID,
      error: err.message,
    });
  }
};

exports.handleSpecialCancel = async (req, res) => {
  const itemID = req.body.itemID;
  const itemSize = req.body.itemSize;
  console.log("item size:  ", itemSize); // Ensure this is passed in the request body

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find and update the order status to "canceled"
    const orderUpdate = await SpecialOrder.findOneAndUpdate(
      { itemID: itemID },
      { status: "canceled" },
      { new: true, session }
    );

    if (!orderUpdate) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({
        message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
      });
    }

    // Find the item and update its quantity
    const item = await sItem.findOne({ ID: itemID }).session(session);

    if (!item) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({
        message: `Cannot find Item with itemID=${itemID}. Maybe Item was not found!`,
      });
    }

    const sizeAndQuantity = item.sizeAndQuantity.find(
      (sq) => sq.size === itemSize
    );

    if (!sizeAndQuantity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Size not found" });
    }

    sizeAndQuantity.quantity += 1; // Increment the quantity

    await item.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.send({
      message: "Order status updated to canceled and Item quantity updated.",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({
      message: "Error updating Order or Item with itemID=" + itemID,
      error: err.message,
    });
  }
};
