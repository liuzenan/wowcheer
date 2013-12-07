
/*
 * User related route
 */
var Auth = require('./middlewares/authentication');
var mongoose = require('mongoose')
var User = mongoose.model('User');
var Util = require('./util');
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
			return res._json(false,{password:"请输入相同密码"});
		} else if (!Util.validateEmail(email)) {
			return res._json(false,{email:"邮箱格式不正确"});
		} else if (password.length < 6){
			return res._json(false,{password:"密码至少六位"})
		}
		User.isExistingUser(email,function(isExistingUser){
			if (isExistingUser) {
				res._json(false, {email:'邮箱已被注册'});
			} else {
				User.signup(email, password, function(err, user, opt){
					if(err) throw err;
					req.login(user, function(err){
						if(err) return next(err);
						return res.redirect("/signup/profile");
					});
				});
			}
		});
	});

	app.get("/signup/profile",Auth.isAuthenticated, function(req,res){
		res.render("signup_profile");
	});
	
	app.post("/signup/profile", Auth.isAuthenticated, function(req,res,next) {
		var username = req.body.username,
			city = req.body.city,
			description = req.body.description;
		var data = {username:username,city:city,description:description}
		User.update(req.user.email, data, function(err){
			if (err) next(err);
			res.redirect("/profile");
		})
	});

	app.get("/profile", Auth.isAuthenticated , function(req, res){ 
		res.render("profile");
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
