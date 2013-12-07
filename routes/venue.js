module.exports = function(app){
  app.get("/venue/:id", function(req,res,next){
     res.send(400);
  })
}