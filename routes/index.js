/**
 * Base level routes
 */

module.exports = function (app,passport,db) {
	/*Attach database,passport to every request*/
	app.all('*', function(req, res, next) {
		req.db = db;
		req.passport =passport;
		next();
    });
	
	/* User authentication*/
	require('./user')(app);
	
	// index page
	app.get("/", function (req, res) {
		 res.render('index', { title: '我去' })
	});
	
	
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.render('index', {title:'404 Not found'});
	});
}

 
