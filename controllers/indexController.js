const db = require("../db/queries");
const bcrypt = require("bcryptjs")

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

async function getJoinMembersPage(req,res) {
  res.render("pages/join-the-club")
}


module.exports = { getSignUpForm, addNewUser, getJoinMembersPage };
