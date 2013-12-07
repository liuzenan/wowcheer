var mongoose = require("mongoose");
var Projects = mongoose.model("Project");
module.exports = function(app){
  /*Render Single Project*/
  app.get("/project/:id", function(req,res,next){
     var q = Projects.findOne({_id:req.params.id}).populate('venue artist');
     q.exec(function(err,project){
       if (err) throw err;
       if (project) {
         res.render('project', {title:project.name, project:project});
       } else {
         next();
       }
     });
  }) 
}