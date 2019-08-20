var express = require("express");
var app = express();
var bodyparser = require("body-parser")

app.use(bodyparser.urlencoded({extended:true}));
var request = require('request');



app.get("/",function(req,res){
    res.render("search.ejs");

});

app.get("/results",function(req,res){  // so this request is automati triggered when u hit submit button on form..u need not explicitly request for this results page...
    var name = req.query.search;      // so this is vey important command...req.query.search which pulls the data out of the input field in the form
    var year = req.query.yr; 
    var genre = req.query.gen;      
    var url = "http://www.omdbapi.com/?apikey=thewdb&s="+name+'&y='+year+'&type='+genre;
    request(url, function (error, response, body) {
    if(!error&&response.statusCode==200){
    var data = JSON.parse(body) //here parser is an object
    //res.send(parser["Search"][0])}
    res.render("results.ejs",{data:data}); //u r passin data that u got back from api to ejs file here
}})

})








app.listen(3000,function(){
    console.log("listening on port 3000")
  
})
