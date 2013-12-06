var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
// Add auto increment of ID
autoIncrement.initialize(mongoose.connection);

var artistSchema = require("./artist");
var citySchema = require("./city");
var projectSchema = require("./project");
var venueSchema = require("./venue");
var userSchema = require("./user");

artistSchema.plugin(autoIncrement.plugin, 'Artist');
citySchema.plugin(autoIncrement.plugin, 'City');
projectSchema.plugin(autoIncrement.plugin, 'Project');
venueSchema.plugin(autoIncrement.plugin,'Venue');

mongoose.model('Artist',artistSchema);
mongoose.model('City',citySchema);
mongoose.model('Project',projectSchema);
mongoose.model('Venue',venueSchema);
mongoose.model('User',userSchema);

module.exports = mongoose;
