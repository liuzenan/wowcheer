/**
 * Base level routes
 */
var mongoose = require('mongoose')
var Artists = mongoose.model('Artist');
var _ = require("underscore");
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
				res.render('index', {title: '我去',types:Projects.types,projects:_.shuffle(projects),artists:_.shuffle(artists)})
			})
		}); 
	});
	
  /* project page*/
	 app.get("/project/:id", function(req,res,next){
     var Project = mongoose.model('Project');
     var q = Project.findOne({_id:req.params.id}).populate('venue artist');
     q.exec(function(err,project){
       if (err) throw err;
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


