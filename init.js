var mongoose = require("mongoose");
var Artists = mongoose.model("Artist");
var Venues = mongoose.model("Venue");
var Cities = mongoose.model("City");
var Projects = mongoose.model("Project");

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
			var projects= require('./data/projects.json');
      
      for (var i = 0; i < projects.length; i ++) {
        // Randomize the date
        var project = projects[i];
        var presale_start_time = new Date();
        presale_start_time.setHours(0);
        presale_start_time.setMinutes(0);
        presale_start_time.setSeconds(0);
        presale_start_time.setTime(presale_start_time.getTime() - 24* 1000*60*60*Math.floor(Math.random()*30+1));
        project.presale_start_time =  presale_start_time;
        var presale_duration = 30 * 24* 1000*60*60*Math.floor(Math.random()*2+2);
        var confirm_time = new Date();
        confirm_time.setHours(23);
        confirm_time.setMinutes(59);
        confirm_time.setSeconds(59);
        project.confirm_time = confirm_time.setTime(confirm_time.getTime() + presale_duration);
        var performance_time = new Date();
        var prepare_duration = 24* 1000*60*60* Math.floor(Math.random()*60+2);
        performance_time.setTime(confirm_time.getTime() + prepare_duration);
        performance_time.setHours(20);
        performance_time.setMinutes(0);
        performance_time.setSeconds(0);
        project.performance_time = performance_time;
         // Dummy booking count
        project.bookingCount = Math.floor(Math.random()*project.sale_limit+1) 
        // Dummy discount
        project.presale_discount = (Math.random() / 5 + 0.7).toFixed(2) //0.8 ~ 1
      }
      
			Projects.create(projects,function(err){
          if (err) throw err;
      });
		}
	})
}
