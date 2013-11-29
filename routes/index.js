/**
 * Base level routes
 */


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
	require('./user')(app,passport);
	
	// index page
	app.get("/", function (req, res) {
		res.render('index', {title: '我去'})
	});
	
	app.get('/project', function(req, res){
		res.render('project', {title:"Project"});
	});
	
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.render('index', {title:'404 Not found'});
	});
}


