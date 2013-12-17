/**
 * Base level routes
 */
var mongoose = require('mongoose')
var Artists = mongoose.model('Artist');
var Project = mongoose.model('Project');
var _ = require("underscore");
var projectController = require('../app/controllers/project');
var Auth = require('./middlewares/authentication');
var bookingController = require('../app/controllers/booking');
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
	app.get("/",  projectController.featureProjects, function (req, res) {
		Artists.find(function(err,artists){
				if (err) throw err;
				res.render('index', {title: '我去',types:Project.types,artists:_.shuffle(artists)})
    }) 
	});
	
  /* project page*/
	app.get("/project/:id", projectController.userProject, function(req,res,next) {
      if (res.locals.project) {
        res.render('project', {title:res.locals.project.name});
      } else {
        next();
      }
  });
  
  /* project booking page*/
	app.get("/booking",function(req,res,next){
     res.render('booking');
  });
  
  
  /* search page*/
  app.get('/search', function(req,res){
    var search = require('../app/controllers/search');
    search(req,res,function(projects){
      res.render("search",{search_result:{type:'project',data:projects}})
    })
  })
  
  /* user authentication routes*/
	require('./user')(app,passport);
  
  app.get("/profile",Auth.isAuthenticated,bookingController.userBookings,function(req, res){
     res.render("profile",{title:'个人空间'});
	});
  
  /* Redirect page*/
  app.get("/redirect",function(req,res){
    res.render('redirect');
  });

   /* API*/
  require('./api')(app);
 
	/*Other page 404*/
	app.all('*',function(req,res) {
		res.send(404);
	});
}


