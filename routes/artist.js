module.exports = function(app){
  app.get("/artist/:id", function(req,res,next){
     res.send(400);
  })
}