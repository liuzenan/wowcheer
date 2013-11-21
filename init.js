var models = require("./app/models/models");
var mongoose = require('mongoose')

module.exports = function(db) {
	// Bootstrap models
	var Artists =db.model('Artists', models.Artists);
	var Venues =db.model('Venues', models.Venues);
	
	Artists.count({},function(err, count){
		if (count == 0) {
			console.log("initialized artists");
			var artists= require('./app/models/artists.json')
			Artists.create(artists);
		}
	});
	
	Venues.count({},function(err, count){
		if (count == 0) {
			console.log("initialized venues");
			var venues= require('./app/models/venues.json')
			Venues.create(venues);
		}
	});
}