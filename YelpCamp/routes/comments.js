var express = require("express")
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground")
var Comment = require("../models/comment")
var middlewareObj = require("../middleware") ///automatically requires index in middleware directory

router.get("/campgrounds/:id",function(req,res){
    var shownCampground;
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("find by ID error")
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground });
        }
    });
})

router.post("/campgrounds/:id",middlewareObj.isLoggedIn, function(req,res){
   var data =req.body.comment;
   // should probably find the campground before storing the comment but i wont change it now
   Comment.create({
       author: data.author,
       content:data.content
   }, function(err, comment){
       if(err){
           console.log("failed to create comment");
       } else {
           Campground.findById(req.params.id, function(err, campground){
           if(err){
               console.log("could not find campground to post comment");
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/"+req.params.id)
           }
       })
       }
   })
})



module.exports=router;