var express = require('express');
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seedDB = require("./seeds");
mongoose.connect("mongodb://localhost/yelp_camp");

var passport=require("passport");
var LocalStrategy=require("passport-local");
var User = require("./models/user");

var commentRoutes   =require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes     =require("./routes/index")
    
var flash=require('connect-flash')

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public',express.static('public'));
//app.use(express.static(__dirname [something here] "/public"));
app.set("view engine", "ejs");


seedDB();

//passport configuration:
app.use(require("express-session")({
    secret:"random long string asjdhfbaskhjfblasdfbaslj hbskjhsadbflasibaja897yu4hjrufdyu3hjrktigf9809gisuvg87h9ur",
    resave:false,
    saveUninitialized:false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.message=req.flash("error")
    next();
});


app.use(indexRoutes);
app.use(commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("started");
})