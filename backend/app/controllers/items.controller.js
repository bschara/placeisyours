const db = require("../models");
const Item = db.items;
const specialItem = db.sItem;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const {
  uploadFileToB2,
  generateShareableUrl,
} = require("../utils/b2-operations");
const formidable = require("formidable");
const path = require("path");

exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send({ message: "Error parsing the form" });
    }

    try {
      // Ensure fields are properly parsed from arrays to single values
      const itemName = Array.isArray(fields.itemName)
        ? fields.itemName[0]
        : fields.itemName;
      const price = Array.isArray(fields.price)
        ? fields.price[0]
        : fields.price;
      const category = Array.isArray(fields.category)
        ? fields.category[0]
        : fields.category;
      const description = Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description;
      const size = Array.isArray(fields.size) ? fields.size[0] : fields.size;

      // Validate required fields
      if (!itemName || !category || !size || !price || !files.mainImage) {
        return res.status(400).send({ message: "All fields are required!" });
      }

      // Process main image
      const mainImage = files.mainImage;
      if (!mainImage || !Array.isArray(mainImage) || mainImage.length === 0) {
        return res.status(400).send({ message: "Main image is required!" });
      }
      const mainImageFile = mainImage[0];
      const mainImageName =
        uuidv4() + path.extname(mainImageFile.originalFilename);
      const mainImageBuffer = fs.readFileSync(mainImageFile.filepath);
      const mainImageUploadName = await uploadFileToB2(
        mainImageBuffer,
        mainImageName
      );

      // Process additional images
      const additionalImages = Array.isArray(files.images)
        ? files.images
        : [files.images];
      const additionalImagesPaths = await Promise.all(
        additionalImages.map(async (file) => {
          const fileName = uuidv4() + path.extname(file.originalFilename);
          const fileBuffer = fs.readFileSync(file.filepath);
          await uploadFileToB2(fileBuffer, fileName);
          return fileName;
        })
      );

      // Create and save the new item
      const item = new Item({
        ID: uuidv4(),
        itemName,
        category,
        mainImage: mainImageUploadName,
        images: additionalImagesPaths,
        size,
        price,
        description: description || "",
      });

      await item.save();
      res.send(item);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal Server Error" });
    }
  });
};

exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  try {
    const totalCount = await Item.countDocuments();

    Item.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .then(async (data) => {
        // Generate shareable URLs for mainImage
        const itemsWithMainImageUrls = await Promise.all(
          data.map(async (item) => {
            console.log("main image :    ", item.mainImage);
            const mainImageUrl = await generateShareableUrl(item.mainImage);

            return {
              ...item.toObject(),
              mainImageUrl: mainImageUrl,
            };
          })
        );

        const totalPages = Math.ceil(totalCount / perPage);
        res.send({
          items: itemsWithMainImageUrls,
          totalPages: totalPages,
          currentPage: page,
          totalItems: totalCount,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving items with pagination.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
exports.findItemsByCategory = async (req, res) => {
  const category = req.params.category;
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  try {
    const totalCount = await Item.countDocuments({ category });

    Item.find({ category })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .then(async (data) => {
        // Generate shareable URLs for mainImage
        const itemsWithMainImageUrls = await Promise.all(
          data.map(async (item) => {
            console.log("main image :    ", item.mainImage);
            const mainImageUrl = await generateShareableUrl(item.mainImage);

            return {
              ...item.toObject(),
              mainImageUrl: mainImageUrl,
            };
          })
        );

        const totalPages = Math.ceil(totalCount / perPage);
        res.send({
          items: itemsWithMainImageUrls,
          totalPages: totalPages,
          currentPage: page,
          totalItems: totalCount,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `Some error occurred while retrieving ${category} items with pagination.`,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

exports.findById = async (req, res) => {
  console.log("getting there");
  const id = req.params.id;
  console.log("id:   ", id);

  try {
    const item = await Item.findOne({ ID: id });
    console.log("item:   ", item);

    if (!item) {
      return res.status(404).send({ message: "Item not found with id " + id });
    }

    const mainImageUrl = await generateShareableUrl(item.mainImage);

    const additionalImageUrls = await Promise.all(
      item.images.map((image) => generateShareableUrl(image))
    );

    const itemWithUrls = {
      ...item.toObject(),
      mainImageUrl,
      additionalImageUrls,
    };

    res.send(itemWithUrls);
  } catch (err) {
    console.error("Error retrieving item:", err);
    res.status(500).send({ message: "Error retrieving item with id=" + id });
  }
};

// exports.updateStatus = (req, res) => {
//   const id = req.query.id;
//   console.log(id);
//   const newStatus = "sold";

//   // Find item by ID and update status
//   Item.findOneAndUpdate({ ID: id }, { status: newStatus }, { new: true })
//     .then((item) => {
//       if (!item) {
//         return res
//           .status(404)
//           .send({ message: `Item not found with ID ${id}` });
//       }
//       res.send(item);
//     })
//     .catch((err) => {
//       console.error("Error updating item status:", err);
//       res
//         .status(500)
//         .send({ message: `Error updating item status with ID ${id}` });
//     });
// };

exports.updateStatus = (req, res) => {
  const id = req.params.id;

  Item.findOne({ ID: id })
    .then((item) => {
      if (!item) {
        res.status(404).send({ message: `Item not found with ID ${id}` });
        return; // Return early to prevent further processing
      }

      // Toggle status
      const newStatus = item.status === "available" ? "sold" : "available";

      // Update item status
      return Item.findOneAndUpdate(
        { ID: id },
        { status: newStatus },
        { new: true }
      );
    })
    .then((updatedItem) => {
      if (updatedItem) {
        res.send(updatedItem);
      }
    })
    .catch((err) => {
      console.error("Error updating item status:", err);
      res
        .status(500)
        .send({ message: `Error updating item status with ID ${id}` });
    });
};
exports.createSpecialItem = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send({ message: "Error parsing the form" });
    }

    try {
      // Extract fields
      const itemName = Array.isArray(fields.itemName)
        ? fields.itemName[0]
        : fields.itemName;
      const price = Array.isArray(fields.price)
        ? fields.price[0]
        : fields.price;
      const category = Array.isArray(fields.category)
        ? fields.category[0]
        : fields.category;
      const description = Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description;
      const sizeAndQuantity = Array.isArray(fields.sizeAndQuantity)
        ? fields.sizeAndQuantity[0]
        : fields.sizeAndQuantity;

      // Validate required fields
      if (!itemName || !category || !price || !files.mainImage) {
        return res.status(400).send({ message: "All fields are required!" });
      }

      // Process main image
      const mainImage = files.mainImage;
      if (!mainImage || !Array.isArray(mainImage) || mainImage.length === 0) {
        return res.status(400).send({ message: "Main image is required!" });
      }
      const mainImageFile = mainImage[0];
      const mainImageName =
        uuidv4() + path.extname(mainImageFile.originalFilename);
      const mainImageBuffer = fs.readFileSync(mainImageFile.filepath);
      const mainImageUploadName = await uploadFileToB2(
        mainImageBuffer,
        mainImageName
      );

      // Process additional images
      const additionalImages = Array.isArray(files.images)
        ? files.images
        : [files.images];
      const additionalImagesPaths = await Promise.all(
        additionalImages.map(async (file) => {
          const fileName = uuidv4() + path.extname(file.originalFilename);
          const fileBuffer = fs.readFileSync(file.filepath);
          await uploadFileToB2(fileBuffer, fileName);
          return fileName;
        })
      );

      // Create and save the new item
      const newSpecialItem = new specialItem({
        ID: uuidv4(),
        itemName,
        price,
        category,
        mainImage: mainImageUploadName,
        images: additionalImagesPaths,
        description: description || "",
        sizeAndQuantity: JSON.parse(sizeAndQuantity) || [],
      });

      const savedItem = await newSpecialItem.save();
      res.status(201).send(savedItem);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Internal Server Error",
      });
    }
  });
};

exports.findSpecialItem = async (req, res) => {
  try {
    const item = await specialItem.findOne();
    console.log("item:   ", item);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    const mainImageUrl = await generateShareableUrl(item.mainImage);

    const additionalImageUrls = await Promise.all(
      item.images.map((image) => generateShareableUrl(image))
    );

    const itemWithUrls = {
      ...item.toObject(),
      mainImageUrl,
      additionalImageUrls,
    };

    res.send(itemWithUrls);
  } catch (err) {
    console.error("Error retrieving item:", err);
    res.status(500).send({ message: "Error retrieving item" });
  }
};

exports.findSpecialItemByID = async (req, res) => {
  const id = req.params.id;
  console.log("id:   ", id);

  try {
    const item = await specialItem.findOne({ ID: id });
    console.log("item:   ", item);

    if (!item) {
      return res.status(404).send({ message: "Item not found with id " + id });
    }

    const mainImageUrl = await generateShareableUrl(item.mainImage);

    const additionalImageUrls = await Promise.all(
      item.images.map((image) => generateShareableUrl(image))
    );

    const itemWithUrls = {
      ...item.toObject(),
      mainImageUrl,
      additionalImageUrls,
    };

    res.send(itemWithUrls);
  } catch (err) {
    console.error("Error retrieving item:", err);
    res.status(500).send({ message: "Error retrieving item with id=" + id });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findOneAndDelete({ ID: id })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .send({ message: `Item not found with ID ${id}` });
      }
      res.send({ message: "Item deleted successfully!" });
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      res.status(500).send({ message: `Error deleting item with ID ${id}` });
    });
};
