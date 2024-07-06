module.exports = (app) => {
  const users = require("../controllers/users.controller");

  const router = require("express").Router();

  // Create a new Tutorial
  router.post("/", users.create);

  app.use("/api/users", router);
};
