var mongoose = require("mongoose");

module.exports = function() {
	// Bootstrap models
	var Artists = mongoose.model('Artist')
	var Venues =mongoose.model('Venue')

	Artists.count({},function(err, count){
		if (count == 0) {
			console.log("initialized artists");
			var artists= require('./data/artists.json')
			Artists.create(artists);
		}
	});
	
	Venues.count({},function(err, count){
		if (count == 0) {
			console.log("initialized venues");
			var venues= require('./data/venues.json')
			Venues.create(venues);
		}
	});
}