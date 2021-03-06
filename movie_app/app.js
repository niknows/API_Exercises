var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("search");
});
app.get("/results",function(req,res){
   var url = "http://www.omdbapi.com/?s=" + req.query.search + "&apikey=thewdb";
   
   request(url,function(error,response,body){
       if(!error && response.statusCode == 200){
          var parsed = JSON.parse(body);
          if(!parsed.Search){
              res.render("error");
          } else
          {
          res.render("results",{parsed: parsed});
          }
       }
   });
});
app.get("*",function(req,res){
    res.send("Essa página não existe.");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie App has started...");
});
