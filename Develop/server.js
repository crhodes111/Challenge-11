// Dependencies
// =============================================================
const express = require('express');
// Import the 'path' module
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });
app.get('/', (req, res) => {

});
app.get('/api/notes', (req, res) => {
  res.json('Hello!');
});
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});