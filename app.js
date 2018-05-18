var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});

  app.set('port',8080);
  app.set('ip',"0.0.0.0");


// Set the app.listen to use the port and ip.
app.listen(app.get('port'), app.get('ip'), function(){
  console.log("Express server listening on " + app.get('ip') + ":" + app.get('port'));
});