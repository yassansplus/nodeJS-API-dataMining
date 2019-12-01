var express = require('express');
var router = express.Router();
var Weather = require('weather');


// define the home page route
router.get('/',  function(req, res) {

    res.render('firstPage', {page:'Home', menuId:'home'});




});

module.exports = router;
