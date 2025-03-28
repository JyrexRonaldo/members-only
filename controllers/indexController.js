const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport");

function getSignUpForm(req, res) {
  res.render("forms/sign-up-form");
}

async function addNewUser(req, res, next) {
  const { firstname, lastname, username, password } = req.body;
  let { admin } = req.body;
  admin = admin || false;
  const member = false;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.addNewUser(firstname, lastname, username, hashedPassword, member, admin);
  next();
}

function getJoinMembersPage(req, res) {
  res.render("pages/join-the-club");
}

async function updateMemberStatus(req, res) {
  const { secretCode } = req.body;
  if (secretCode === "Hello") {
    await db.updateMemberStatus(req.user.id);
  }
  res.redirect("/");
}

function getLogInPage(req, res) {
  res.render("forms/log-in-form");
}

async function getHomePage(req, res) {
  if (req.isAuthenticated()) {
    const posts = await db.getAllPosts();
    res.render("pages/home", { posts });
  } else {
    res.redirect("/log-in");
  }
}

const authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

function logOutUser(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in");
  });
}

async function addNewMessage(req, res) {
  const { messageTitle, message } = req.body;
  const userId = req.user.id;
  db.addNewMessage(messageTitle, message, userId);
  res.redirect("/");
}

async function deleteMessage(req,res) {
  const messageId = req.params.messageId;
  await db.deleteMessage(messageId);
  res.redirect("/");
}

module.exports = {
  getSignUpForm,
  addNewUser,
  getJoinMembersPage,
  updateMemberStatus,
  getLogInPage,
  getHomePage,
  authenticateUser,
  logOutUser,
  addNewMessage,
  deleteMessage,
};
