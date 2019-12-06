const express = require('express');
const app = express();
let indexRoute = require("./middleware/index");
let weather = (require('./weather'))
var sentimentTweeter = require('./sentimentTweeter');
var face = require('./face');
var firstPage = require('./firstPage');
var sophia = require('./sophia')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use('/tweeter/',sentimentTweeter);
app.use('/meteo/',weather);
app.use('/faceRecognition/',face);
app.use('/',firstPage);
app.use('/sophia/',sophia);




app.listen(3000,'0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})
