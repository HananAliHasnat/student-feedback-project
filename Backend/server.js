const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MyRootP@ssword123",
  database: "stfbp"
});

// Connect to DB
db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// POST: Add Feedback (direct to DB)
app.post("/add-feedback", (req, res) => {
  const { student_name, message } = req.body;

  if (!student_name || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO feedback (student_name, message) VALUES (?, ?)";
  db.query(sql, [student_name, message], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Feedback submitted successfully!" });
  });
});

// GET: Fetch Feedback from DB
app.get("/feedback", (req, res) => {
  const sql = "SELECT student_name, message FROM feedback ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
