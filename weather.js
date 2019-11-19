var express = require('express');
var router = express.Router();
var Weather = require('weather');


// define the home page route
router.get('/:search',  function(req, res) {

 
    const appID = 'KCkD4m9nZYJLn4ScvFNb'; // here.com appID
    const appCode = 'T5pv0crZXEcIrdsxMzTxOg'; // here.com appCode
    let myWeather;
    const weather = new Weather({
        appID,
        appCode
    });
     
    // now(<location>) returns a Promise
    weather.now('Franconville, France').then((results) => {
        res.json(results)
    });
    

   
    

});

module.exports = router;