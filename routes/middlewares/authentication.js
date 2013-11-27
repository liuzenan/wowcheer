var User = require('../../app/models/user');

/*Check isLogged in, otherwise redirect to login,for use of authorized only page*/
exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}