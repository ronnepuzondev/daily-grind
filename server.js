const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require("cors");


require('dotenv').config();
// Connect to db after the dotenv above
require('./config/database');
const DailyJournal = require('../daily-grind/models/dailyjournal');
const app = express();
app.use(cors());

app.use(logger('dev'));
// Process data in body of request if 
// Content-Type: 'application/json'
// and put that data on req.body
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// middleware that adds the user object from a JWT to req.user
app.use(require('./config/checkToken'));

// Put all API routes here (before the catch-all)
app.use('/api/users', require('./routes/api/users'));
// app.post('/api/dailyJournalRoute', require('./routes/api/dailyJournalRoute'))

app.post("/create", (req, res) => {
  const newNote = new DailyJournal({
    gratefulFor: req.body.gratefulFor,
    affirmations: req.body.affirmations
  });

  newNote
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

// "catch-all" route that will match all GET requests
// that don't match an API route defined above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});