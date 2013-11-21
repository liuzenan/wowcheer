/**
 * Base level routes
 */
module.exports = function (app,passport) {
	require('./user')(app,passport);
	
	// index page
	app.get("/", function (req, res) {
		var body = '<a href="auth/facebook">login with facebook</a>';
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', body.length);
        res.end(body);
	});
	
}
 