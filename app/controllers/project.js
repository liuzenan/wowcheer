var mongoose = require('mongoose');
var Project = mongoose.model('Project');
module.exports.userProject = function(user,id,callback) {
  var q = Project.findOne({_id:id}).select('-bookings');
}