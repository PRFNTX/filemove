var express=require("express");
var app = express();

app.use(express.static("public")) //sets location for... things? using it for stylesheet atm
app.set("view engine","ejs") //make default extension for views (render) .ejs files, so .ejs doesnt have to be added to references

app.get("/",function(req,res){
    //res.render("home.html")
    res.render("home")
})

app.get("/:para", function(req,res){
    var para = req.params.para;
    res.render("para",{par: para})
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Started");
})