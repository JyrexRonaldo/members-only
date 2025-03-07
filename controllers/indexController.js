const db = require("../db/queries");
const bcrypt = require("bcryptjs");

function getSignUpForm(req, res) {
  res.render("forms/sign-up-form");
}

async function addNewUser(req, res, next) {
  const { firstname, lastname, username, password } = req.body;
  let { admin } = req.body;
  admin = admin || false;
  const member = false;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.addNewUser(firstname, lastname, username, hashedPassword, member, admin);
  // passport.authenticate("local", {
  //   successRedirect: "/yeah",
  //   failureRedirect: "/log-in"
  // })
  // console.log(req.user)
  // res.redirect("/");
}

function getJoinMembersPage(req, res) {
  res.render("pages/join-the-club");
}

async function updateMemberStatus(req, res) {
  const { secretCode } = req.body;
  if (secretCode === "Hello") {
    await db.updateMemberStatus(req.user.id);
  }
}

function getLogInPage(req,res) {
  res.render("forms/log-in-form")
}

function getHomePage(req,res) {
  res.render("pages/home")
}

module.exports = {
  getSignUpForm,
  addNewUser,
  getJoinMembersPage,
  updateMemberStatus,
  getLogInPage,
  getHomePage
};
