// server.js
// where your node app starts
// jshint esversion:6

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function(req,res){
  date = new Date();
  const json = {unix: date.getTime(), utc: date.toUTCString()};
  res.send(json);
});


app.get("/api/timestamp/:datestring", function(req,res){
  const dateString = req.params.datestring;
  if (/\D/.exec(dateString) || dateString.length<=4){
    date = new Date(dateString);
  } else {
    date = new Date(Number(dateString));
  }
  if(date == "Invalid Date"){
    const json = {error: "Invalid Date"};
    res.send(json);
  } else {
    const json = {unix: date.getTime(), utc: date.toUTCString()};
    res.send(json);
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
