var express=require("express");
var app = express();

// "/" => "hi"
app.get("/", function(req,res){
    res.send("Hi there");
    console.log("root landing")
})

app.get("/bye", function(req,res){
    res.send("Goodbye");
    console.log("accessed bye")
})

app.get("/r/:SpaceJam", function(req,res){
    res.send(String(req.params.SpaceJam));
})

app.get("*",function(req,res){
    res.send("you're lost");
    console.log("bad route")
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started")
}); //parameters are specifically for c9