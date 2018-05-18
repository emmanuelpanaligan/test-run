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


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

});