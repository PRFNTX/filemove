// var request = require('request');
//request ('http://www.google.com', function (error, response, body) {
//  if (!error && response.statusCode==200){
//  console.log(body) //show the html for the google homepage
//}
//}
var request = require('request');
request("https://www.google.ca",function(error, response, body){
   if (error){
       console.log(error);
   } 
   else {
       if (!error && response.statusCode==200){
        console.log(body) 
       } 
   }
})