
/*Check isLogged in, otherwise redirect to login,for use of authorized only page*/
exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}
/*Check isLogged in, otherwise response 401*/
exports.isAPIAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.send(401);
    }
}