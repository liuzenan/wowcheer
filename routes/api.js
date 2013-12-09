var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var search = require('../app/controllers/search');
var auth = require('./middlewares/authentication')
var projectController = require('../app/controllers/project')
module.exports = function(app){
  /*Search*/
  app.get('/api/search',function(req,res,next){
    search(req,res,function(projects){
       if (projects) {
        res._json(true,projects);
       } else {
        next();
       }
    })
  });
  
  /*Project api*/
  app.get("/api/project/:id", function(req,res,next){
      projectController.userProject(req.user,req.param('id'),function(project){
        if(project) {
          res._json(true,project);
        } else {
          next();
        }
      })
  })
  
  app.get("/api/project/:id/booking", function(req,res,next){
      Project.findOne({_id:req.param('id')},function(err, project){
         if (err) throw err;
         if (project) res._json(true,project);
         else next();
      })
  })

  app.post("/api/project/:id/booking", function(req,res,next){
      Project.findOne({_id:req.param('id')},function(err, project){
         if (err) throw err;
         if (project) res._json(true,project);
         else next();
      })
  })
  
  app.post("/api/project/:id/comments", function(req,res,next){
      res.send(200)
      Project.findOne({_id:req.param('id')},function(err, project){
         if (err) throw err;
         if (project && (req.param('content').trim() != '')) {
          var user = req.user.username;
          project.addComment(user,req.param('content'),function(err){
            if (err) throw err;
            res._json(true,null);
          })
         } else {
          next();
         }
      })
  })
}