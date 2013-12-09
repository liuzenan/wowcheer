var mongoose = require('mongoose');
var Booking = mongoose.model('Booking');

module.exports.makeBooking = function(req,res,callback){
    
}

module.exports.cancelBooking = function(req,res,callback){

}



module.exports.userBookings = function(req,res,next) {
  var q = Booking.find({user:req.user.id}).sort('updatedAt').populate('project');
   q.exec(function(err,bookings){
     if (err) throw err;
     res.locals.bookings = bookings;
     next();
   })
}