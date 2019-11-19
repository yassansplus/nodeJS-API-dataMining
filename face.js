var express = require('express');
var router = express.Router();
var base64Img = require('base64-img');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// define the home page route
router.get('/:image',  function(req, res) {
    // var image64 = req.body.image;
    var image64 = req.params.image;

 
    // base64Img.img(image64, 'public/assets/image/', '1', function(err, filepath) {
    //      console.log(filepath)
    //     res.json(image64)

    // });
 
    

   
    

});

module.exports = router;