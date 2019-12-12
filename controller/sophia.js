var express = require('express');
var router = express.Router();
var Weather = require('weather');
const fs = require('fs');
router.get('/',  function(req, res) {

    res.render('sophia/login', {page:'Home', menuId:'home'});




});

// define the home page route
router.post('/',  function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var laDate = new Date().toISOString();
    var data = ' mon ip = '+ip + " à la date :"+ laDate +"\n";
    fs.appendFile("./public/assets/estPasse.txt", data, function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    res.render('sophia/index', {page:'Home', menuId:'home'});




});

module.exports = router;
