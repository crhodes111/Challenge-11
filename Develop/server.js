// Dependencies
// =============================================================
const express = require('express');
// Import the 'path' module
const path = require('path');

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });