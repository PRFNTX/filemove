var mongoose = require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment")

var data = [
    {
        name: "Name 1",
        Image: "https://source.unsplash.com/fKySMHHYe0o",
        description: "this is the description for Name 1"
    },
    {
        name:"Name 2",
        Image: "https://source.unsplash.com/fKySMHHYe0o",
        description: "this is the description for Name 2"
    },
    {
        name: "Name 3",
        Image: "https://source.unsplash.com/fKySMHHYe0o",
        description: "this is the description for Name 3"
    },
    {
        name: "Name 4",
        Image: "https://source.unsplash.com/fKySMHHYe0o",
        description: "this is the description for Name 4"
    },
    
    ]
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create({
                        content: "This is a comment",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            data.comments.push(comment);
                            data.save();
                            console.log("Create new comment")
                            
                        }
                    })
                }
            });
        });
    });
}

module.exports = seedDB;