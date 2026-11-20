
const db = require("../config/db");

// 1. Kubona ubutumwa bwose (Admin)
exports.getMessages = async (req, res) => {
  try {
    const [messages] = await db.promise().query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({
      message: "Failed to fetch messages"
    });
  }
};

// 2. Umukiriya kohereza ubutumwa
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required"
      });
    }

    const [result] = await db.promise().query(
      `INSERT INTO messages (name, email, phone, message)
       VALUES (?, ?, ?, ?)`,
      [name, email, phone || null, message]
    );

    res.status(201).json({
      message: "Message sent successfully",
      id: result.insertId
    });

  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      message: "Failed to send message"
    });
  }
};

// 3. Gushyira ubutumwa kuri read (Admin)
exports.markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.promise().query(
      "UPDATE messages SET status = 'read' WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(200).json({
      message: "Message marked as read"
    });

  } catch (error) {
    console.error("Mark message error:", error);

    res.status(500).json({
      message: "Failed to update message"
    });
  }
};

// 4. Gusiba ubutumwa (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.promise().query(
      "DELETE FROM messages WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(200).json({
      message: "Message deleted successfully"
    });

  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      message: "Failed to delete message"
    });
  }
};
