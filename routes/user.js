
/*
 * User related route
 */
module.exports = function(app){
	app.get("/login", function(req,res){
			res.render("login",{providerConfig:req.config.provider});
	});
	
	app.get("/signup", function(req,res){
			res.render("signup");
	});
	
	app.get('/logout', function (req, res) {
		req.session.destroy(function () {
			res.redirect('/');
		});
	});
	
	app.post("/login", function(req,res){
		req.passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
	});
	
	app.get("/signup", function (req, res) {
		if (req.session.user) {
			res.redirect("/");
		} else {
			res.render("signup");
		}
	});

	app.get('/auth/:provider', 
		function(req,res) {
			req.passport.authenticate(req.params.provider)(req, res);
		}
	);

	app.get('/auth/:provider/callback',  
		function (req,res){
			req.passport.authenticate(req.params.provider, { failureRedirect: '/login' })(req, res);
		},  
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/');
		}
	);
	
};