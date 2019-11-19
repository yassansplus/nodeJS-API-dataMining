var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var sentiment = require('sentiment-multilang');
var DateFormat = require('./middleware/DatFormat')
// define the home page route
router.get('/:id/:echantillon',  function(req, res) {

    var client = new Twitter({
      consumer_key: 'E0OBpgATZe8yQOpGM7AEXApYQ',
      consumer_secret: 'UzwRYSyYeCQjt2HcygqkNdSgPsbhT840pIRxiXla0zYjgNjotv',
      access_token_key: '1147655039990865920-IzaPdTn87D7K8MbvQl4fRMCke1hRK4',
      access_token_secret: 'OZLEuUqgpaaURK3XQERJku9M1Yzkp74MuZwfVVDFGRNqc'
    });
  
    //[vote,score,purcent]
    let neutral = [0,0,];  
    let positive = [0,0,]
    let negative =[0,0,];
  
    var params = { screen_name: req.params.id, include_rts: 1 ,exclude_replies: true,is_quote_status:false, count: req.params.echantillon };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
      for(let i = 0; i<tweets.length; i++){
        let sentimentAnalyse = sentiment(tweets[i].text,'fr');
        switch(sentimentAnalyse.vote){
          case "neutral":
            neutral[0]++;
            neutral[1] += sentimentAnalyse.score
            break;
          case "positive":
            positive[0]++;
            positive[1] += sentimentAnalyse.score
            break;
            
          case "negative":
            negative[0]++;
            negative[1] += sentimentAnalyse.score
           
           
 
          break;

        }
      }
    

      toReturn = {
        sentiment : {
          negative: {
            vote: negative[0],
            score: negative[1],
            purcent: Number.parseFloat((negative[0]/tweets.length)*100).toFixed(2),
          },
          positive: {
            vote: positive[0],
            score: positive[1],
            purcent: Number.parseFloat((positive[0]/tweets.length)*100).toFixed(2),

          },
          neutral: {
            vote: neutral[0],
            score: neutral[1],
            purcent: Number.parseFloat((neutral[0]/tweets.length)*100).toFixed(2)

          }
        },
        between_date:{
          start:DateFormat(tweets[tweets.length-1].created_at) ,
          end: DateFormat(tweets[0].created_at),

        },
        echantillon : tweets.length,
        screen_name : tweets[0].user.screen_name,
        name : tweets[0].user.name,
        profil_pics : tweets[0].user.profile_image_url
  
      };
        res.json(toReturn) ;
      }
    });
  });


  
  
  
  module.exports = router;