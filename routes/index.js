/**
 * Base level routes
 */
module.exports = function (app,passport) {
	/* GET "404" page. */
	app.all('*', function(req,res){
		res.render('index', { title: 'Lost' })
	});
	
	require('./user')(app,passport);
	
	// index page
	app.get("/", function (req, res) {
		 res.render('index', { title: '我去' })
	});
}

 
