/**
 * Base level routes
 */
var mongoose = require('mongoose')
var Artists = mongoose.model('Artist');
var Project = mongoose.model('Project');
var _ = require("underscore");
var projectController = require('../app/controllers/project');
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
		Project.featureProjects(function(err,projects){
			if (err) throw err;
			Artists.find(function(err,artists){
				if (err) throw err;
				res.render('index', {title: '我去',types:Project.types,projects:_.shuffle(projects),artists:_.shuffle(artists)})
			})
		}); 
	});
	
  /* project page*/
	app.get("/project/:id", function(req,res,next){
    projectController.userProject(req.user,req.param('id'),function(project){
      if (project) {
        res.render('project', {title:project.name, project:project});
      } else {
        next();
      }
    });
  }) 
  
  /* search page*/
  app.get('/search', function(req,res){
    var search = require('../app/controllers/search');
    search(req,res,function(projects){
      res.render("search",{title:"search",search_result:{type:'project',data:projects}})
    })
  })
  
  /* user authentication routes*/
	require('./user')(app,passport);
  
  
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


