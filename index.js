const express = require('express');
const app = express();
var bodyParser = require("body-parser");



let indexRoute = require("./middleware/index");
let weather = (require('./controller/weather'))
var sentimentTweeter = require('./controller/sentimentTweeter');
var face = require('./controller/face');
var firstPage = require('./controller/firstPage');
var sophia = require('./controller/sophia')
const cron = require("node-cron");
const mining = require('./controller/mining');
const userExtraction = require('./controller/userExtraction')


app.use(bodyParser.urlencoded({ extended: true }));
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
app.use('/user',userExtraction);


cron.schedule("*/1 * * * *", function() {
  mining.extractNews("brevesdepresse");
  mining.extractNews("AlertesInfos");
  mining.extractNews("FranceNews24");
  mining.extractNews("lemondefr");

});
app.listen(process.env.PORT || 8000, function () {
  console.log('Example app listening on port 3000!')
})
