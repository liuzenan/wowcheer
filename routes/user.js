
/*
 * User related route
 */
var User = require('../app/models/user');
var Auth = require('./middlewares/authorization.js');
module.exports = function(app,passport){
	/*Auth*/
	app.get("/login", function(req, res){
		if (req.user) {
			res.redirect("/profile")
		} else {
			res.render("login");
		}
	});

	app.post("/login" 
		,passport.authenticate('local',{
			successRedirect : "/profile",
			failureRedirect : "/login",
		})
	);
	
	app.get("/signup", function (req, res) {
		if (!req.user) {
			res.render("signup");
		} else {
			res.redirect("/profile");
		}
	});

	app.post("/signup", Auth.userExist, function (req, res, next) {
		User.signup(req.body.email, req.body.password, function(err, user){
			if(err) throw err;
			req.login(user, function(err){
				if(err) return next(err);
				return res.redirect("profile");
			});
		});
	});
	
	app.get("/profile", Auth.isAuthenticated , function(req, res){ 
		res.render("profile", { user : req.user});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
	
	app.get('/auth/:provider', 
		function(req,res,next) {
			passport.authenticate(req.params.provider)(req, res,next);
		}
		);

	app.get('/auth/:provider/callback',  
		function (req,res,next){
			passport.authenticate(req.params.provider, { failureRedirect: '/login' })(req, res,next);
		},  
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/');
		}
	);
	
};
