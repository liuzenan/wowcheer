/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: '我去' })
};
/* GET "some" page. */
exports.some = function(req, res){
  res.render('index', { title: 'Express' })
};
/* GET "navigation" page. */
exports.navigation = function(req, res){
  res.render('index', { title: 'Express' })
};
/* GET "links" page. */
exports.links = function(req, res){
  res.render('index', { title: 'Express' })
};
/* GET "404" page. */
exports.lost = function(req, res){
  res.render('index', { title: 'Lost' })
};
