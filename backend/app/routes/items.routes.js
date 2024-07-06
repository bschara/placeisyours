const upload = require("../config/multer-config");

module.exports = (app) => {
  const items = require("../controllers/items.controller");

  const router = require("express").Router();

  // router.post("/", upload.array("mainImage", 4), items.create);
  router.post(
    "/",
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "images", maxCount: 3 },
    ]),
    items.create
  );

  router.get("/", items.findAll);

  router.get("/itemById", items.findById);

  router.put("/updateItemStatus", items.updateStatus);

  app.use("/api/items", router);
};
