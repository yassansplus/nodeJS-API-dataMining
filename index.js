const express = require('express');
const app = express();
let indexRoute = require("./middleware/index");
let weather = (require('./weather'))
var sentimentTweeter = require('./sentimentTweeter');
var face = require('./face');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

app.use(express.static('public'));
app.use('/tweeter/',sentimentTweeter);
app.use('/meteo/',weather);
app.use('/faceRecognition/',face);





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
