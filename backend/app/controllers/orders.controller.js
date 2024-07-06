const db = require("../models");
const Order = db.orders;
const uuid = require("uuid");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.itemName ||
    !req.body.category ||
    !req.body.mainImage ||
    !req.body.buyerEmail ||
    !req.body.buyerPhoneNumber ||
    !req.body.itemPrice ||
    !req.body.buyerFullName
  ) {
    res.status(400).send({ message: "All fields are required!" });
    return;
  }

  const id = uuid.v4();

  // Create an Order
  const order = new Order({
    id: id,
    itemName: req.body.itemName,
    category: req.body.category,
    mainImage: req.body.mainImage,
    buyerEmail: req.body.buyerEmail,
    buyerPhoneNumber: req.body.buyerPhoneNumber,
    buyerFullName: req.body.buyerFullName,
    itemPrice: req.body.itemPrice,
    itemID: req.body.itemID,
  });

  // Save Order in the database
  order
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
// Retrieve all Orders from the database.
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

// Find all Orders with a phone number
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

// Update a Tutorial by the id in the request
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

// Find all orders pending payment
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

// Find all orders pending processing
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

// Delete a Tutorial with the specified id in the request
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

// Delete all Tutorials from the database.
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

// Find all published Tutorials
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

// Change status of an order to completed
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

exports.handleCancel = (req, res) => {
  const itemID = req.body.itemID;

  Order.findOneAndUpdate(
    { itemID: itemID },
    { status: "canceled" },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with itemID=${itemID}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order status updated to canceled." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with itemID=" + itemID,
      });
    });
};

exports.hello = (req, res) => {
  return res.json("hello user");
};
