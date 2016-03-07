var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var routes = require('./public/routes/hero');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

app.get('/*', function(req, res) {
  if (req.params[0]) {
    res.sendFile(path.join(__dirname, req.params[0]));
  } else {
    var filePath = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, 'public', filePath));
  }
  //var filePath = req.params[0] || 'views/index.html';
  //res.sendFile(path.join(__dirname, 'public', filePath));

});

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.listen(4242, function(){
  console.log('listening on port 4242');
});