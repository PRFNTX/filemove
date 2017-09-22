
var express = require("express")
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground")
var Comment = require("../models/comment")
var User = require("../models/user")
var passport = require("passport")
var middlewareObj = require("../middleware") ///automatically requires index in middleware directory

router.get("/",function(req,res){
    res.render("home");
    console.log("home accessed");
});

//AUTH Routes
router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    var newUser= new User({username: req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("campgrounds");
        });
    });
});

//show login form:
router.get("/login", function(req,res){
    
    res.render("login")
})

router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureredirect: "/login"
}), function(req,res){
    //post callback
});

//logout
router.get("/logout",function(req,res){
    req.logout();
    res.flash("error", "logged out")
    res.redirect("/campgrounds");
})



module.exports=router;