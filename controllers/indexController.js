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
  res.redirect("/");
}

module.exports = { getSignUpForm, addNewUser };
