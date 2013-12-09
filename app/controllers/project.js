var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Booking = mongoose.model('Booking');
module.exports.userProject = function(user,id,callback) {
  var q = Project.findOne({_id:id});
  // Find bookings with the id
  q.exec(function(err, project){
    if(err) throw err;
    if (project) {
      // Append booking count to the found project
      Booking.count({project:project._id},function(err,count){
        if (err) throw err;
        project.bookingCount = count;
        // Append booking information of current user
        Booking.find({user:user},function(err, bookings){
          if (err) throw err;
          project.bookings = bookings;
          callback(project);
        })
      });
    }
  })
}