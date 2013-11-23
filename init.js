var mongoose = require("mongoose");
var Artists = require("./app/models/artist");
var Venues = require("./app/models/venue");
var Cities = require("./app/models/city");
var Projects = require("./app/models/project")
module.exports = function() {
	// Bootstrap models
	Artists.count({},function(err, count){
		if (count == 0) {
			console.log("initialized artists data");
			var artists= require('./data/artists.json')
			Artists.create(artists);
		}
	});
	
	Venues.count({},function(err, count){
		if (count == 0) {
			console.log("initialized venues data");
			var venues= require('./data/venues.json')
			Venues.create(venues);
		}
	});
	
	Cities.count({},function(err,count){
		if (count == 0) {
			console.log("initialized cities data");
			var cities= require('./data/cities.json')
			Cities.create(cities);
		}
	})
	
	Projects.count({},function(err,count){
		if (count == 0) {
			console.log("initialized project data");
			var projects= require('./data/projects.json')
			Projects.create(projects);
		}
	})
}
