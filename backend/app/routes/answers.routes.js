const verifyToken = require("../middleware/token-middlware");
const { addAnswerLimit } = require("../middleware/limiter");

module.exports = (app) => {
  const Answer = require("../controllers/answers.controller");

  const router = require("express").Router();

  router.post("/", addAnswerLimit, Answer.create);

  router.get("/", verifyToken, Answer.getAllAnswers);

  app.use("/api/answers", router);
};
