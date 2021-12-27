// Dependencies
// =============================================================
const express = require('express');
// Import the 'path' module
const path = require('path');
const fs = require('fs')
var uniqid = require('uniqid'); 


const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

function createNewNote(body) {
  const note = body;
  const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  
  savedNotes.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(savedNotes)
  );
  return note;
}




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });



app.get('/api/notes', (req, res) => {
  let results = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    res.json(results)
  })

app.post('/api/notes', (req, res) => {
  req.body.id = uniqid();
  console.log(req.body)
  const note = createNewNote(req.body)
  res.json(note)
})
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get('/api/notes/:id', (req,res)=>{
  let notearray = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  for (i=0; i < notearray.length; i++){
    console.log(notearray[i])
    if(notearray[i].id === req.params.id){
      let note = notearray[i]
      res.json(note)
    }
  }

})
app.delete('/api/notes/:id', (req,res)=>{
  let notearray = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  for (i=0; i < notearray.length; i++){
    console.log(notearray[i])
    if(notearray[i].id === req.params.id){
     let removedNote = notearray[i]
     notearray.splice(removedNote, 1)
    }
  }

})