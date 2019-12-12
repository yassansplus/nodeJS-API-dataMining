var express = require('express');
var router = express.Router();
var Weather = require('weather');
var Twitter = require('twitter');



var client = new Twitter({
    consumer_key: 'E0OBpgATZe8yQOpGM7AEXApYQ',
    consumer_secret: 'UzwRYSyYeCQjt2HcygqkNdSgPsbhT840pIRxiXla0zYjgNjotv',
    access_token_key: '1147655039990865920-IzaPdTn87D7K8MbvQl4fRMCke1hRK4',
    access_token_secret: 'OZLEuUqgpaaURK3XQERJku9M1Yzkp74MuZwfVVDFGRNqc'
  });
// define the home page route
router.get('/',  function(req, res) {
  
    var params = {tweet_mode: "extended", screen_name: "Quotes_PS", include_rts: 1 ,exclude_replies: true,is_quote_status:false, count: 200 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
        var rand = tweets[Math.floor(Math.random() * tweets.length)];
        let txt = rand.full_text;
        console.log(rand);
    

      res.render('firstPage', {mySentence :txt});
      }
    });




});

module.exports = router;
