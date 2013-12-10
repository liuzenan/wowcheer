var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');
var Project = mongoose.model('Project')
module.exports.makeBooking = function(req, res, next){
  var userID = req.user.id;
  var projectID = req.param('id');
  var tickets = req.param('tickets');
  Booking.count({user:userID,project:projectID},function(err,count){
    if (err) throw err;
    if (count > 0) {
      // User already booked
      res._json(false,{message:"不能重复购买"})
    } else {
      Booking.create({user:userID,project:projectID,tickets:tickets},function(err,booking){
        if (err) throw err;
        Project.findOne({_id:projectID},function(err,project){
          if (err) throw err;
          var bookingCount = project.bookingCount +1; 
          Project.findOneAndUpdate({_id:projectID},{bookingCount:bookingCount},function(err,updatedProject){
            if (err) throw err;
            res._json(true,updatedProject);
          })
        });
      });
    }
  })
}

module.exports.cancelBooking = function(req,res,callback){
   var userID = req.user.id;
   var projectID = req.param('id');
   var tickets = req.param('tickets');
}



module.exports.userBookings = function(req,res,next) {
  var q = Booking.find({user:req.user.id}).sort('updatedAt').populate('project artist venue');
   q.exec(function(err,bookings){
     if (err) throw err;
     res.locals.bookings = bookings;
     next();
   })
}
