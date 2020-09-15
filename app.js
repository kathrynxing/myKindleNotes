var express = require('express');
var app = express();
var mongoose = require('mongoose');
app.set("view engine", "ejs");
app.get('/',function(req, res){
    res.render("home");
});
app.get('/topeter',function(req,res){
    res.render("letter");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
  });