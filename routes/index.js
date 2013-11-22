/**
 * Base level routes
 */
var mongoose = require('mongoose')


module.exports = function (app,passport,db,config) {
	/*Attach database,passport to every request*/
	app.all('*', function(req, res, next) {
		req.db = db;
		req.passport =passport;
		req.config = config;
		next();
    });
	
	/* User authentication*/
	require('./user')(app);
	
	// index page
	app.get("/", function (req, res) {
		var Artist = mongoose.model('Artist')
		var artists = Artist.find();
		res.render('index', { title: '我去', artists:artists})
	});
	
	
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.render('index', {title:'404 Not found'});
	});
}

 
