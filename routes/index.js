/**
 * Base level routes
 */
var User = require('../app/models/user');
var Auth = require('./middlewares/authorization.js');

module.exports = function (app,passport,db,config) {
	/*Attach database,passport to every request*/
	app.all('*', function(req, res, next) {
		req.db = db;
		req.passport =passport;
		req.config = config;
		res.locals.message = req.flash();
		next();
    });
	
	/* User authentication*/
	//require('./user')(app);
	
	// index page
	app.get("/", function (req, res) {
		res.render('index', {title: '我去'})
	});
	
	
	/*Auth*/
	app.get("/login", function(req, res){
		if (req.user) {
			res.redirect("/")
		} else {
			res.render("login");
		}
	});

	app.post("/login" 
		,passport.authenticate('local',{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);
	
	app.get("/signup", function (req, res) {
		res.render("signup");
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
			function(req,res) {
					passport.authenticate(req.params.provider)(req, res);
			}
	);

	app.get('/auth/:provider/callback',  
			function (req,res){
					passport.authenticate(req.params.provider, { failureRedirect: '/login' })(req, res);
			},  
			function(req, res) {
					// Successful authentication, redirect home.
					res.redirect('/');
			}
	);
	
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.render('index', {title:'404 Not found'});
	});
}

 
