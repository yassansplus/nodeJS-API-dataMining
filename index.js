const express = require('express');
const app = express();
let indexRoute = require("./middleware/index");
let weather = (require('./weather'))
var sentimentTweeter = require('./sentimentTweeter');
var face = require('./face');

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];


app.use(express.static('public'));
app.use('/tweeter/',sentimentTweeter);
app.use('/meteo/',weather);
app.use('/faceRecognition/',face);





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
