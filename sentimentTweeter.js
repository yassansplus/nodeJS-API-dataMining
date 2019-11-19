var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var sentiment = require('sentiment-multilang');
// define the home page route
router.get('/:id/:echantillon',  function(req, res) {

    var client = new Twitter({
      consumer_key: 'E0OBpgATZe8yQOpGM7AEXApYQ',
      consumer_secret: 'UzwRYSyYeCQjt2HcygqkNdSgPsbhT840pIRxiXla0zYjgNjotv',
      access_token_key: '1147655039990865920-IzaPdTn87D7K8MbvQl4fRMCke1hRK4',
      access_token_secret: 'OZLEuUqgpaaURK3XQERJku9M1Yzkp74MuZwfVVDFGRNqc'
    });
  
    let tab = "";
    //[vote,score]
    let neutral = [0,0];  
    let positive = [0,0]
    let negative =[0,0];
  
    var params = { screen_name: req.params.id, include_rts: 1 ,exclude_replies: true,is_quote_status:false, count: req.params.echantillon };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
      for(let i = 0; i<tweets.length; i++){
        tab = tab+" "+ tweets[i].text
        let sentimentAnalyse = sentiment(tweets[i].text,'fr');
        switch(sentimentAnalyse.vote){
          case "neutral":
            neutral[0]++;
            neutral[1] += sentimentAnalyse.score
          case "positive":
            positive[0]++;
            positive[1] += sentimentAnalyse.score
          case "negative":
            negative[0]++;
            negative[1] += sentimentAnalyse.score

        }
        console.log (negative,positive,negative);

      }
    let sentimentAnalyse = sentiment(tab,'fr');
     
      toReturn = {
        sentiment : {
          negative: {
            vote: negative[0],
            score: negative[1]
          },
          positive: {
            vote: positive[0],
            score: positive[1]
          },
          neutral: {
            vote: neutral[0],
            score: neutral[1]
          }
        },
        echantillon : tweets.length,
        screen_name : tweets[0].user.screen_name,
        name : tweets[0].user.screen_name,
        profil_pics : tweets[0].user.profile_image_url
  
      };
      console.log(toReturn)
        res.json(toReturn) ;
      }
    });
  });

  module.exports = router;