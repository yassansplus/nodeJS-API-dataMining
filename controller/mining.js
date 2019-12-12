// var DateFormat = require('../middleware/DatFormat')
var Twitter = require('twitter');
var Sqljob = require('../middleware/Sqljob');

var client = new Twitter({
    consumer_key: 'KqowUo5o5SYTwBxGJMiIGHwcc',
    consumer_secret: 'VXdfX4Ug8lfLx2dTVcFCQsQsROLcfvQhk64dybt2umrdAtAomH',
    access_token_key: '841426149012045827-dVVEbUFxXwEQi0isZ4nHZ31YxLquxns',
    access_token_secret: 'AimVu9AKQ8FJuS2KvIDk5TW6kwcXNPRdtnSpj8h8mc1eP'
  });




function extractNews(){
    var params = {tweet_mode: "extended", screen_name: "brevesdepresse", include_rts: 1 ,exclude_replies: true,is_quote_status:false, count: 3200 };
client.get('statuses/user_timeline', params, function (error, tweets, response) {

    if(!error){
        for(let i=0;i< tweets.length; i++){
            
            let isExisting = Sqljob.CheckExistingInformation(tweets[i]);
            
            if(isExisting !== 0){
                console.log("Il existe deja en base de données");
            }else{
                Sqljob.insertNews(tweets[i]);

            }
           

        }
    }
    process.exit(1); 

});
}
module.exports= {extractNews} 