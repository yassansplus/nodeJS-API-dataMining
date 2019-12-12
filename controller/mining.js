
var Twitter = require('twitter');
// var Sqljob = require('../middleware/Sqljob');


// get the client
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mining', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });
const News = sequelize.import("../Model/News");




var client = new Twitter({
    consumer_key: 'KqowUo5o5SYTwBxGJMiIGHwcc',
    consumer_secret: 'VXdfX4Ug8lfLx2dTVcFCQsQsROLcfvQhk64dybt2umrdAtAomH',
    access_token_key: '841426149012045827-dVVEbUFxXwEQi0isZ4nHZ31YxLquxns',
    access_token_secret: 'AimVu9AKQ8FJuS2KvIDk5TW6kwcXNPRdtnSpj8h8mc1eP'
  });
  var params = {
      tweet_mode: "extended",
      screen_name: "brevesdepresse",
      include_rts: 1 ,
      exclude_replies: true,
      is_quote_status:false,
       count: 3200
     };

function extractNews(account){
    client.get('statuses/user_timeline', params = {tweet_mode: "extended", screen_name: account,include_rts: 1 ,exclude_replies: true,is_quote_status:false,count: 3200}, function (error, tweets, response) {
    
        for (let i = 0; i<tweets.length; i++){
                News.findOne({ where: {id: tweets[i].id} }).then(news => {
                  // project will be the first entry of the Projects table with the title 'aProject' || null
                console.log(news , tweets[i].id )
                  if(!news){
                  News.create({ id: tweets[i].id, userId: tweets[i].user.id, username: tweets[i].user.screen_name,tweet: tweets[i].full_text }).then(jane => {
                    console.log("Jane's auto-generated ID:", jane.id);
                  });
                }
                })

                
          
                }
        
    
    });

}
module.exports = {extractNews}  
