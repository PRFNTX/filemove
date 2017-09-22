var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");

//user: email, name
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var userSchema =  new mongoose.Schema({
    name: String,
    email: String,
    posts:[postSchema]
});
 var User = mongoose.model("User", userSchema);
//POST: title, content

var Post = mongoose.model("Post",postSchema);

var newUser = new User({
    email:"Black@brown.edu",
    name: "Mr. Black"
});
newUser.posts.push({
    title: "how to post",
    content: "you do this"
})
newUser.save(function(err,user){
    if(err){
       console.log(err); 
    } else {
        console.log(user);
    }
})

var newPost = new Post({
    title:"thinger McDinger",
    content:"thing ding"
});
newPost.save(function(err,post){
    if(err){
        console.log(err);
    } else {
        console.log(post);
    }
})