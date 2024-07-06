const db = require("../models");
const Item = db.items;
const uuid = require("uuid");
const fs = require("fs");
const resizeImage = require("../utils/imageUtils");

exports.create = async (req, res) => {
  try {
    if (
      !req.body.itemName ||
      !req.body.category ||
      !req.body.size ||
      !req.files ||
      !req.body.price
    ) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    const id = uuid.v4();

    const mainImage = req.files.mainImage;
    console.log(mainImage);
    const mainImagePath = mainImage[0].path;

    console.log(mainImagePath);
    const additionalImages = req.files.images;

    // Check if additionalImages is an array before attempting to map over it
    const additionalImagesPaths = Array.isArray(additionalImages)
      ? additionalImages.map((file) => file.path)
      : [];

    console.log(additionalImagesPaths);

    // const resizedMainImagePath = path.join(
    //   path.dirname(mainImagePath),
    //   `resized-${path.basename(mainImagePath)}`
    // );
    await resizeImage(mainImagePath, 400, 400);

    const item = new Item({
      ID: id,
      itemName: req.body.itemName,
      category: req.body.category,
      mainImage: mainImagePath,
      images: additionalImagesPaths,
      size: req.body.size,
      price: req.body.price,
      description: req.body.description || "",
    });

    item
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        // Ensure that req.files is an array before using forEach
        if (Array.isArray(req.files)) {
          req.files.forEach((file) => {
            fs.unlink(file.path, () => {});
          });
        }
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Item.",
        });
      });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.findAll = (req, res) => {
  Item.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.findById = (req, res) => {
  const id = req.query.id;
  Item.findOne({ ID: id })
    .then((item) => {
      console.log("Item found:", item);
      if (!item) {
        return res
          .status(404)
          .send({ message: "Item not found with id " + id });
      }
      res.send(item);
    })
    .catch((err) => {
      console.error("Error retrieving item:", err);
      res.status(500).send({ message: "Error retrieving item with id=" + id });
    });
};
// Update the status of an item
exports.updateStatus = (req, res) => {
  const id = req.query.id;
  console.log(id);
  const newStatus = "sold";

  // Find item by ID and update status
  Item.findOneAndUpdate({ ID: id }, { status: newStatus }, { new: true })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: `Item not found with ID ${id}` });
      }
      res.send(item);
    })
    .catch((err) => {
      console.error("Error updating item status:", err);
      res
        .status(500)
        .send({ message: `Error updating item status with ID ${id}` });
    });
};
