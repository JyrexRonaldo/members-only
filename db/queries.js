const pool = require("./pool");

async function getUserByUserName(username) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function getUserByUserId(id) {
  const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
    id,
  ]);
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
  await pool.query("UPDATE members SET is_member = TRUE WHERE id = $1", [
    memberId,
  ]);
}

async function addNewMessage(messageTitle, message, userId) {
  await pool.query(
    "INSERT INTO messages(title,text,added) VALUES ($1, $2,'NOW');",
    [messageTitle, message]
  );

  const { rows } = await pool.query(
    "SELECT messages_id_seq.last_value FROM messages_id_seq;"
  );

  const newMessageId = +rows[0].last_value;
  await pool.query(
    "INSERT INTO member_messages (member_id, message_id) VALUES ($1, $2);",
    [userId, newMessageId]
  );
}

async function getAllPosts() {
  const { rows } = await pool.query(
    `SELECT t.title, t.text, m.firstname, m.lastname, t.added 
    FROM members as m 
    INNER JOIN member_messages AS mt ON m.id = mt.member_id 
    INNER JOIN messages AS t ON mt.message_id = t.id;`
  );
  return rows;
}

module.exports = {
  getUserByUserName,
  getUserByUserId,
  addNewUser,
  updateMemberStatus,
  addNewMessage,
  getAllPosts,
};
