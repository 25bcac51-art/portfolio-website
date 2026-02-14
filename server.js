const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database Setup
const db = new sqlite3.Database('./contact_responses.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// Create table with the new EMAIL column included
db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
)`);

// API Endpoint to handle form submission with email
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body; 
    const sql = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;

    db.run(sql, [name, email, message], function(err) {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Connected to the SQLite database.`);
    console.log(`Server running at http://localhost:3000`);
});