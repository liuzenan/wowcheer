var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Booking = mongoose.model('Booking');
module.exports.userProject = function(req,res,next) {
  if (!req.param('id')) return next();
  var projectID = req.param('id');
  var q = Project.findOne({_id:projectID,visible:true}).populate('venue artist');
  // Find bookings with the id
  q.exec(function(err, project){
    if(err) throw err;
    if (project) {
      if (req.user) {
        // Append booking information of current user
        Booking.findOne({user:req.user.id,project:projectID},function(err, booking){
          if (err) throw err;
          project.booking = booking;
          res.locals.project = project;
          next();
        });
      } else {
        res.locals.project = project;
        next();
      }
    } else {
      next();
    }
  })
}


module.exports.featureProjects = function(req,res,next) {
	var limit = req.param('limit') || 50;
	var q= Project.find({
    visible:true, 
    performance_time:{$gt:new Date()}
  }).populate("venue artist").sort('bookingCount').limit(limit);
  
  q.exec(function(err, projects){
    if (err) throw err;
    res.locals.projects = projects;
    next();
  });
}