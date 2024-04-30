const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
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

// Handle GET request to fetch all student profile data
app.get('/studentprofiles', (req, res) => {
  connection.query('SELECT * FROM studentprofile', (err, result) => {
    if (err) {
      console.error('Error fetching student profiles:', err);
      res.status(500).send('Error fetching student profiles');
      return;
    }

    res.json(result);
  });
});

// Handle POST request to insert a new student profile and account
app.post('/studentprofile', (req, res) => {
  const { schoolId, email, lastname, course, firstname, section, middleInitial, year, age, contact, username, password } = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      res.status(500).send('Error starting transaction');
      return;
    }

    connection.query(
      'INSERT INTO studentprofile(school_id, email, last_name, course, first_name, section, middle_initial, year_level, age, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [schoolId, email, lastname, course, firstname, section, middleInitial, year, age, contact],
      (err, profileResult) => {
        if (err) {
          console.error('Error inserting into studentprofile table:', err);
          connection.rollback(() => {
            res.status(500).send('Error inserting into studentprofile table');
          });
          return;
        }

        connection.query(
          'INSERT INTO studentaccount(username, password) VALUES (?, ?)',
          [username, password, profileResult.insertId],
          (err, accountResult) => {
            if (err) {
              console.error('Error inserting into studentaccount table:', err);
              connection.rollback(() => {
                res.status(500).send('Error inserting into studentaccount table');
              });
              return;
            }

            connection.commit((err) => {
              if (err) {
                console.error('Error committing transaction:', err);
                connection.rollback(() => {
                  res.status(500).send('Error committing transaction');
                });
                return;
              }

              res.status(201).send('Student profile and account inserted successfully');
            });
          }
        );
      }
    );
  });
});

// Make the server publicly accessible
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
