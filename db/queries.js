const pool = require("./pool");

async function getUserByUserName(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function getUserByUserId(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function addNewUser(
  firstname,
  lastname,
  username,
  password,
  isMember,
  isAdmin
) {
  await pool.query(
    `INSERT INTO members (firstname,
  lastname,
  username,
  password,
  is_member,
  is_admin) VALUES ($1, $2, $3, $4, $5, $6)`,
    [firstname, lastname, username, password, isMember, isAdmin]
  );
}

async function updateMemberStatus(memberId) {
    await pool.query("UPDATE members SET is_member = TRUE WHERE id = $1", [id])
}

module.exports = {
  getUserByUserName,
  getUserByUserId,
  addNewUser,
  updateMemberStatus
};
