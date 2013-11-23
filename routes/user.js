
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
	
	app.get("/signup", function (req, res) {
		if (req.session.user) {
			req.flash('info', 'Welcome to the site, a welcome email has been sent to you.');
			res.redirect("/");
		} else {
			res.render("signup");
		}
	});
	
	app.get('/logout', function (req, res) {
		req.session.destroy(function () {
			
			res.redirect('/');
		});
	});
	
	app.post("/login", function(req,res){
		req.passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })(req,res);
	});
	
	app.post("/signup", function(req,res){
		req.passport.authenticate('local', { 
									successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })(req,res);
	});
	
	
	
};