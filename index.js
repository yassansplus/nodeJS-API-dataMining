const express = require('express');
const app = express();
let indexRoute = require("./middleware/index");
let weather = (require('./weather'))
var sentimentTweeter = require('./sentimentTweeter');
var face = require('./face');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.use(express.static('public'));
app.use('/tweeter/',sentimentTweeter);
app.use('/meteo/',weather);
app.use('/faceRecognition/',face);





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
