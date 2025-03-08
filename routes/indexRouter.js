const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter
  .route("/")
  .get(indexController.getHomePage)
  .post(indexController.addNewMessage);
indexRouter
  .route("/sign-up")
  .get(indexController.getSignUpForm)
  .post(indexController.addNewUser, indexController.authenticateUser);

indexRouter
  .route("/join-the-club")
  .get(indexController.getJoinMembersPage)
  .post(indexController.updateMemberStatus);

indexRouter
  .route("/log-in")
  .get(indexController.getLogInPage)
  .post(indexController.authenticateUser);
indexRouter.get("/log-out", indexController.logOutUser);

module.exports = indexRouter;
