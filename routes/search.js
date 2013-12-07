/*Search functionality controller*/
var mongoose = require("mongoose");
var Projects = mongoose.model("Project");
var Artists = mongoose.model("Artist");
var Venues = mongoose.model("Venue")
module.exports = function(app) {
  app.get('/search', function(req,res){
  
    // Visibility
    var q = Projects.where("visible",true);
    // Type
    if(req.param('type')) q.where("types",req.param('type'));
    // Project performance_time should be with period from now to the query date 
    var time = req.param('time');
    var beforeDate = new Date()
    if (time) {
      beforeDate.setTime(beforeDate.getTime() + 24 *60 * 60 * 1000 * time);
      q.where('performance_time').lte(beforeDate).gte(new Date());
    } else {
      q.where('performance_time').gte(new Date());
    }
    // Query limit
    var limit = req.param('limit') ? req.param('limit'):50;
    q.limit(limit);                      
   
    if (req.param('city') && req.param('artist')) {
      q.populate('venue',null,{name:new RegExp(req.param('city'))});
      q.populate('artist',null,{name:req.param('artist')});
    } else if (req.param('city')) {
      q.populate('venue',null,{name:new RegExp(req.param('city'))});
      q.populate('artist');
    } else {
      q.populate('artist',null,{name:req.param('artist')});
      q.populate('venue');
    }
    
    q.exec(function(err, projects){
      if (err) throw err;
      projects = projects.filter(function(project){
          return project.artist && project.venue;
      })
      res._json(true,projects);
    })
  })  
}