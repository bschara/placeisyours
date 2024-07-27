const verifyToken = require("../middleware/token-middlware");

module.exports = (app) => {
  const mailingList = require("../controllers/mailing_list.controller");

  const router = require("express").Router();

  router.post("/", mailingList.addEmail);

  router.get("/", verifyToken, mailingList.getAllEmails);

  router.delete("/", mailingList.removeEmail);

  app.use("/api/mailingList", router);
};
