/**
 * Base level routes
 */
module.exports = function (app,passport) {
	require('./user')(app);
	app.get("/", function (req, res) {
		var body = 'Hello World';
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', body.length);
        res.end(body);
	});
	app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
	app.get("/auth/facebook/callback",
		passport.authenticate("facebook",{ failureRedirect: '/login'}),
		function(req,res){
			var body = req.user.name;
			res.setHeader('Content-Type', 'text/plain');
			res.setHeader('Content-Length', body.length);
			res.end(body);
		}
	);
}
 