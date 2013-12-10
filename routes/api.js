var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var search = require('../app/controllers/search');
var auth = require('./middlewares/authentication');
var projectController = require('../app/controllers/project');
var bookingController = require('../app/controllers/booking');
module.exports = function(app){
  /* Login*/
  app.get('/api/login', function(req,res,next){
    if (req.user) {
      res._json(true,null);
    } else {
      res._json(false,null,401);
    }
  })
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
  
  app.get("/api/project/:id/bookings",auth.isAPIAuthenticated,bookingController.userBookings,function(req,res){
      res._json(true,res.locals.bookings);
  });

  app.post("/api/project/:id/bookings",auth.isAPIAuthenticated, bookingController.makeBooking)
  
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