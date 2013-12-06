/**
 * Base level routes
 */
var mongoose = require('mongoose')
var Artists = mongoose.model('Artist');
var Projects = mongoose.model('Project');

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
		Projects.featureProjects(function(err,projects){
			if (err) throw err;
			Artists.find(function(err,artists){
				if (err) throw err;
				res.render('index', {title: '我去',projects:projects,artists:artists})
			});
		}); 
	});
	
	app.get('/project', function(req, res){
		res.render('project', {title:"Project"});
	});

  
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.send(404);
	});
}


