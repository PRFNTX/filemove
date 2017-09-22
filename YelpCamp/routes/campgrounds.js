var express = require("express")
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground")
var Comment = require("../models/comment")
var middlewareObj = require("../middleware") ///automatically requires index in middleware directory

router.get("/",function(req,res){
    //get campgrounds
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {allCampgrounds: campgrounds});
        }
    })
});

router.post("/",function(req,res){
    var data = req.body;
    Campground.create({
        name: data.name,
        image: data.imgSrc,
        description: 'This is only a test'
    }, function(){
        console.log("added");
    });
    res.redirect("/");
});

router.get("/new", function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id/comments/new",middlewareObj.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("find by ID error on new get comment page")
        } else {
            res.render("comments/new",{campground: campground})
        }
    })
})


module.exports=router;