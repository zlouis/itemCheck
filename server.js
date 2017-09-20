var express = require("express");
var cheerio= require("cheerio");
var request = require("request");
var app = express();
var mysql= require("mysql")
var fs = require("fs");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "itemChecks"
});


app.get('/scrape', function(req, res){

  url = "https://www.costco.com/LG-86%22-Class-(85.6%22-Diag.)-4K-Ultra-HD-LED-LCD-TV.product.100361021.html";
   request(url, function(err, response, html) {

      if(!err){
       var $= cheerio.load(html);

      var reviews;
      var json ={
        reviews:"",
      };

      $('#reviews-text').filter(function(){

        var data=$(this);

        reviews = data.text();

        json.reviews=reviews;

        if(json.reviews === "Reviews") {
          console.log("reviewd checked")
        } else {
          console.log("didn't work")
        }

     

      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');

  })
res.send('Check your console!')
})
});

app.listen("3000")
console.log("Initilizing port 3000")
exports = module.exports.app;

