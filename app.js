var express = require('express');
var app = express();

var bodyParser  = require('body-parser');
app.use(bodyParser.json());

// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoApp', function(err) {
    if(err) {
        console.log('connection error', err);
        process.exit(1);
    } else {
        console.log('connection successful');
    }
});


// make this available to our users in our Node applications
//module.exports = User;

var users = require('./users');

var path = require("path");

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  //res.send('Hello World!');
   res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/users/', function (req, res) {
  users.findAll(req, res);
});

app.get('/users/:username', function (req, res) {
  users.findByUserName(req,res);
});


// accept POST request on the users
app.post('/users', function (req, res) {
  console.log('received post with body: %j', req.body);
  
  users.AddUser(req, res);

});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});