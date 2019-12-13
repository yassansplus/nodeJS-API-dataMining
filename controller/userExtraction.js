
var express = require('express');
var router = express.Router();
const mining = require('./mining')


router.post('/look',function(req,res){
    var username = req.body.username; 
    
        mining.extractPics(username)

    
    console.log("on est dedans")
    res.redirect('/');
  
  
  });

router.get('/',function(req,res){
   
    res.render('extractPicture');
  
  
  });

  module.exports = router;