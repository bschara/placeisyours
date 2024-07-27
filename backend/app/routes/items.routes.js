const verifyToken = require("../middleware/token-middlware");

module.exports = (app) => {
  const items = require("../controllers/items.controller");

  const router = require("express").Router();

  router.post("/", verifyToken, items.create);

  router.post("/createSpecialItem", verifyToken, items.createSpecialItem);

  router.get("/findSpecialItem", items.findSpecialItem);

  router.get("/findSpecialItemById/:id", items.findSpecialItemByID);

  router.get("/", items.findAll);

  router.get("/:category", items.findItemsByCategory);

  router.get("/itemById/:id", items.findById);

  router.put("/updateItemStatus/:id", verifyToken, items.updateStatus);

  router.delete("/:id", verifyToken, items.delete);

  app.use("/api/items", router);
};
