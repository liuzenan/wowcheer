/*Search functionality controller*/
var mongoose = require("mongoose");
var Projects = mongoose.model("Project");
var Artists = mongoose.model("Artist");
var Venues = mongoose.model("Venue")
var search = function(req,res,callback){
    // Paging
    //var req.param('page')
    // Visibility
    var q = Projects.where("visible",true);
    // Type
    if(req.param('type')) {
      var types = req.param('type').split(" ");
      console.log(types)
      q.where("types",types);
     }
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
    var limit = (req.param('limit') <= 50) ? req.param('limit'):50;
    q.limit(limit);                      
    
    // Reference query is a bit tricky, this is the best solution I can get
    if (req.param('city') && req.param('artist')) {
      q.populate('venue',null,{name:new RegExp(req.param('city'))});
      q.populate('artist',null,{name:req.param('artist')});
    } else if (req.param('city')) {
      q.populate('venue',null,{name:new RegExp(req.param('city'))});
      q.populate('artist');
    } else if (req.param('artist')) {
      q.populate('artist',null,{name:req.param('artist')});
      q.populate('venue');
    } else {
      q.populate('artist');
      q.populate('venue');
    }
    
    q.exec(function(err, projects){
      if (err) throw err;
      projects = projects.filter(function(project){
          return project.artist && project.venue;
      })
      callback(projects)
    })
  }

  
module.exports = search;