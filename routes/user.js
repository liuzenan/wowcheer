
/*
 * User related route
 */
var Auth = require('./middlewares/authentication');
var User = require('../app/models/user');
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
			failureFlash: true
		})
	);
	
	app.get("/signup", function (req, res) {
		if (!req.user) {
			res.render("signup");
		} else {
			res.redirect("/profile");
		}
	});

	app.post("/signup", function (req, res,next) {
		var email = req.body.email;
		var password = req.body.password;
		var confirmPassword = req.body.password_confirm;
		if (password!=confirmPassword) {
			res.json({error:'Password not the same'});
		}
		User.isExistingUser(email,function(isExistingUser){
			if (isExistingUser) {
				res.json({error:'This email is already registered'});
			} else {
				User.signup(email, password, function(err, user, opt){
					if(err) throw err;
					req.login(user, function(err){
						if(err) return next(err);
						return res.redirect("profile");
					});
				});
			}
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
