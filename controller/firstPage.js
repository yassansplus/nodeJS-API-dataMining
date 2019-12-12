var express = require('express');
var router = express.Router();
var Weather = require('weather');
var Twitter = require('twitter');



var client = new Twitter({
    consumer_key: 'KqowUo5o5SYTwBxGJMiIGHwcc',
    consumer_secret: 'VXdfX4Ug8lfLx2dTVcFCQsQsROLcfvQhk64dybt2umrdAtAomH',
    access_token_key: '841426149012045827-dVVEbUFxXwEQi0isZ4nHZ31YxLquxns',
    access_token_secret: 'AimVu9AKQ8FJuS2KvIDk5TW6kwcXNPRdtnSpj8h8mc1eP'
  });
// define the home page route
router.get('/',  function(req, res) {
    myIP = req.connection.remoteAddress
    var params = {tweet_mode: "extended", screen_name: "Quotes_PS", include_rts: 1 ,exclude_replies: true,is_quote_status:false, count: 3200 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
    

      if (!error) {
        var rand = tweets[Math.floor(Math.random() * tweets.length)];
        let txt = rand.full_text;
        console.log(rand);
        // client.post('statuses/update', {status: "Eva viens de detecter la connexion d'une personne checker les logs pour en savoir plus. pour la citation: \n\n"+txt+""}, function(error, tweet, response) {
        //     if (error) {
        //       console.log(tweet);
        //     }
        // });
        

      res.render('firstPage', {mySentence :txt});
      }
    });




});

module.exports = router;
