var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var george =new Cat({
    name: "George",
    age: 11,
    temperament: "grouchy"
});

george.save(function(err, cat){
    if(err){
        console.log("BAD THINGS");
    } else {
        console.log("Cat saved")
        console.log(cat);
        console.log(george);
    }
});

Cat.find({},function(err, cats){
    if (err){
        console.log("errrrrr")
    } else {
        console.log("all the cals");
        console.log(cats);
    }
})

Cat.create({
    name: "Snow white",
    age: 15,
    temperament: "ZBland"
}, function(err, cat){
    if(err){
        console.log("Error");
        console.log(err);
    } else {
        console.log("CATS"); //prints all the cats
        console.log(cat);
    }
});