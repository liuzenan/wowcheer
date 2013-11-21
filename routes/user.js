
/*
 * User related route
 */
module.exports = function(app, passport){
	app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
	
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
	
	app.get("/auth/facebook/callback",
		passport.authenticate("facebook",{ failureRedirect: '/login'}),
		function(req,res){
			var body = "login as " + req.user.name +"<br>" + "<a href = '/logout'></a>";
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Content-Length', body.length);
			res.end(body);
		}
	);
};