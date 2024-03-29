var express = require("express");
var app= express();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo");

var passport=require("passport");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));

var User=require("./models/user");
app.use(require("express-session")({
    secret: "encoding phrase, this should be long and random",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set('view engine', 'ejs');

//==================================
//ROUTES
//==================================


app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req,res){
    res.send("this is the secret page")
})

//Auth Routes:
app.get("/register",function(req,res){
   res.render("register") ;
})

app.post("/",function(req,res){
   req.body.username;
   req.body.password;
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
           res.redirect("secret");
       });
   });
});

//Login:
app.get("/login", function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
        sucessRedirect: "/secret",
        failureRedirect: "/login"
    }), function(req,res){});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Ready");
});

//Logout:
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("login");
}