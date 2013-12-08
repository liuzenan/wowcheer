/**
 * Base level routes
 */
var mongoose = require('mongoose')
var Artists = mongoose.model('Artist');
var Projects = mongoose.model('Project');
var _ = require("underscore")
 module.exports = function (app,passport,db,config) {
 	/*Attach database,passport to every request*/
 	app.all('*', function(req, res, next) {
    console.log(req.route);
 		req.db = db;
 		req.passport =passport;
 		req.config = config;
 		next();
 	});

	/* index page */
	app.get("/", function (req, res) {
		Projects.featureProjects(function(err,projects){
			if (err) throw err;
			Artists.find(function(err,artists){
				if (err) throw err;
				res.render('index', {title: '我去',types:Projects.types,projects:_.shuffle(projects),artists:_.shuffle(artists)})
			})
		}); 
	});
	
  /* Project routes*/
	require('./project')(app);
  
  /* Artist routes*/
	require('./artist')(app);
  
  /* Venue routes*/
	require('./venue')(app);
	
  /* Search*/
  require('./search')(app);
  
  /* User authentication*/
	require('./user')(app,passport);
  
  /* Redirect page*/
  app.get("/redirect",function(req,res){
    res.render('redirect');
  });
  
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.send(404);
	});
}


