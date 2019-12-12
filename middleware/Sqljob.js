// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'eva'
});
 

function  CheckExistingInformation(tweet){
    
    let count =
    connection.query(
        'SELECT * FROM `news` WHERE `id` = ?',
        [tweet.id],
        function(err, results) {

            return results.length;
            
        }
      );
      return count._rows.length;
      
     
}



function CheckExistingFact(tweet){
    connection.query(
        'SELECT count(*) FROM `fact` WHERE `id` = ?',
        [tweet.id],
        function(err, results) {
          console.log(results);
        }
      );
}

function insertNews(tweet){
    connection.execute(
        'INSERT INTO news (id,userId,username,text) VALUES(?,?,?,?)',
        [tweet.id,tweet.user.id,tweet.user.screen_name,tweet.full_text],
        function(err, results) {
            if(err){
                console.log('ok');
            }
            console.log('\x1b[32m',"insertion du tweet")
          console.log(results);
        }
      );

    
    //  connection.query(
    //     'INSERT INTO news VALUES(?,?,?,?)',
    //     [tweet.id,tweet.user.id,tweet.user.screen_name,tweet.full_text],
    //     function(err, results, fields) {
    //         console.log(err);
    //       console.log(results); // results contains rows returned by server
    //       console.log(fields); // fields contains extra meta data about results, if available
       
    //     }
    //   );
    
}

module.exports = {insertNews, CheckExistingInformation};