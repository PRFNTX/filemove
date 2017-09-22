var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",function(req,res){
    res.render("home")
    console.log("root accessed")
})


var friendsList=["person1","person2","person3","person4","person5"];
app.get("/friends",function(req,res){
    
   res.render("friends",{fList: friendsList}) 
})

app.post("/addFriend", function(req,res){
    //res.send("you've reached the post route <a href='https://test1-prfntx.c9users.io/friends'><Button>Go Back </button></a>")
   friendsList.push(req.body.name) 
   res.redirect("/friends")
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Started")
})