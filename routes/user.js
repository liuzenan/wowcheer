
/*
 * User related route
 */
module.exports = function(app){
	app.get("/login", function(req,res){
			res.render("login");
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

	
	
	/*
	app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
	app.get("/auth/facebook/callback",
		passport.authenticate("facebook",{ failureRedirect: '/login'}),
		function(req,res){
			var body = "login as " + req.user.name +"<br>" + "<a href = '/logout'></a>";
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Content-Length', body.length);
			res.end(body);
		}
	);*/
};