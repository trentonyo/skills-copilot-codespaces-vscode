// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create connection to database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comments'
});

// Connect to database
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to database');
});

// Get all comments
app.get('/comments', function(req, res) {
  connection.query('SELECT * FROM comments', function(err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

// Create a new comment
app.post('/comments', function(req, res) {
  var comment = req.body.comment;
  connection.query('INSERT INTO comments (comment) VALUES (?)', [comment], function(err) {
    if (err) throw err;
    res.send('Comment added');
  });
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  connection.query('DELETE FROM comments WHERE id = ?', [id], function(err) {
    if (err) throw err;
    res.send('Comment deleted');
  });
});

// Start web server
app.listen(PORT, function() {
  console.log('Web server started');
});


