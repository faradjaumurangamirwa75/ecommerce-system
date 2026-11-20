
const db = require("../config/db");

// Get all messages
exports.getAllMessages = async () => {
  const [rows] = await db.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return rows;
};

// Create message
exports.createMessage = async (name, email, subject, message) => {
  const [result] = await db.query(
    `INSERT INTO messages (name, email, subject, message)
     VALUES (?, ?, ?, ?)`,
    [name, email, subject || null, message]
  );
  return result.insertId;
};

// Mark message as read
exports.markAsRead = async (id) => {
  const [result] = await db.query(
    "UPDATE messages SET status = 'read' WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

// Delete message
exports.deleteMessage = async (id) => {
  const [result] = await db.query(
    "DELETE FROM messages WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};
