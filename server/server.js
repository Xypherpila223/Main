const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sccinventory'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Verify student account login
app.post('/studentaccount/login', (req, res) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM studentaccount WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error verifying student account:', err);
      res.status(500).json({ error: 'Error verifying student account' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Student account not found or invalid credentials' });
      return;
    }
    res.json(results[0]);
  });
});

// Add a new student account
app.post('/studentaccount/register', (req, res) => {
  const { username, password } = req.body;
  connection.query('INSERT INTO studentaccount (username,password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) {
      console.error('Error adding new student account:', err);
      res.status(500).json({ error: 'Error adding new student account' });
      return;
    }
    res.json({ id: result.insertId, username, password });
  });
});

// Get all student accounts
app.get('/studentaccount', (req, res) => {
  connection.query('SELECT * FROM studentaccount', (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Error fetching data from database' });
      return;
    }
    res.json(results);
  });
});

// Add a new student account
app.post('/studentaccount', (req, res) => {
  const { username, password } = req.body;
  connection.query('INSERT INTO studentaccount (username,password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) {
      console.error('Error adding new student account:', err);
      res.status(500).json({ error: 'Error adding new student account' });
      return;
    }
    res.json({ id: result.insertId, username, password });
  });
});

// Make the server publicly accessible
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

