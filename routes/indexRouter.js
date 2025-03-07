const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", (req, res) => {
  res.json("Hello memebers");
});
indexRouter.route("/sign-up").get(indexController.getSignUpForm).post();

module.exports = indexRouter;
