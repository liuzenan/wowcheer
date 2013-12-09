var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
// Add auto increment of ID
autoIncrement.initialize(mongoose.connection);

var artistSchema = require("./artist");
var citySchema = require("./city");
var projectSchema = require("./project");
var venueSchema = require("./venue");
var userSchema = require("./user");
var authSchema = require("./auth");
var bookingSchema = require("./booking");

artistSchema.plugin(autoIncrement.plugin, 'Artist');
citySchema.plugin(autoIncrement.plugin, 'City');
projectSchema.plugin(autoIncrement.plugin, 'Project');
venueSchema.plugin(autoIncrement.plugin,'Venue');
userSchema.plugin(autoIncrement.plugin,'User');
bookingSchema.plugin(autoIncrement.plugin,'Booking');

mongoose.model('Artist',artistSchema);
mongoose.model('City',citySchema);
mongoose.model('Project',projectSchema);
mongoose.model('Booking',bookingSchema);
mongoose.model('Venue',venueSchema);
mongoose.model('User',userSchema);
mongoose.model('Auth',authSchema);

module.exports = mongoose;
