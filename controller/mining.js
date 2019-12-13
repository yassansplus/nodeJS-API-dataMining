
var Twitter = require('twitter');
// var Sqljob = require('../middleware/Sqljob');
const download = require('image-downloader')
var fs = require('fs');

// get the client
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mining', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
const News = sequelize.import("../Model/News");
const UserInfo = sequelize.import("../Model/UserInfo");
const compareThem  = require('../middleware/compareImage')





var client = new Twitter({
  consumer_key: 'KqowUo5o5SYTwBxGJMiIGHwcc',
  consumer_secret: 'VXdfX4Ug8lfLx2dTVcFCQsQsROLcfvQhk64dybt2umrdAtAomH',
  access_token_key: '841426149012045827-dVVEbUFxXwEQi0isZ4nHZ31YxLquxns',
  access_token_secret: 'AimVu9AKQ8FJuS2KvIDk5TW6kwcXNPRdtnSpj8h8mc1eP'
});
var params = {
  tweet_mode: "extended",
  screen_name: "brevesdepresse",
  include_rts: 1,
  exclude_replies: true,
  is_quote_status: false,
  count: 3200
};

function extractNews(account) {
  client.get('statuses/user_timeline', params = { tweet_mode: "extended", screen_name: account, include_rts: 1, exclude_replies: true, is_quote_status: false, count: 3200 }, function (error, tweets, response) {

    for (let i = 0; i < tweets.length; i++) {
      News.findOne({ where: { id: tweets[i].id } }).then(news => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        console.log(news, tweets[i].id)
        if (!news) {
          News.create({ id: tweets[i].id, userId: tweets[i].user.id, username: tweets[i].user.screen_name, tweet: tweets[i].full_text, dateTweet: new Date(tweets[i].created_at) }).then(jane => {
            console.log("Jane's auto-generated ID:", jane.id);
          });
        }
      })



    }


  });

}


function extractPics(account) {
  client.get('users/show', params = { screen_name: account }, function (error, tweets, response) {
    let uri = tweets.profile_image_url.replace('_normal','');
    let destination = './public/image/' + account ;
    if (!fs.existsSync(destination)){
      fs.mkdirSync(destination);
  }
    const options = {
      url: uri,
      dest: './public/image/' + account                // Save to /path/to/dest/image.jpg
    }
    download.image(options)
      .then(({ filename, image }) => {
        UserInfo.findOne({ where: { id: tweets.id_str } }).then(user => {
    
          if (!user) {
            console.log( "\x1b[31m", "L'utilisateur n'a pas été trouvé");
            UserInfo.create({ id: tweets.id_str, imagePath: filename, screen_name: account, geo: tweets.location, created_at: new Date(tweets.created_at) }).then(jane => {
             
            });
          }
          else{
            console.log( '\x1b[36m%s\x1b[0m', "L'utilisateur a été trouvé");
           // verifier que les images sont les meme.

          }
        })
        console.log('Saved to', filename)  // Saved to /path/to/dest/image.jpg
      })
      .catch
    



  });

}




module.exports = { extractNews, extractPics }  
