var middlewareObj ={};

 middlewareObj.isLoggedIn= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Log in")
    res.redirect("/login");
 }

module.exports=middlewareObj;