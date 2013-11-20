/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: '我去' })
};
/* GET "404" page. */
exports.lost = function(req, res){
  res.render('index', { title: 'Lost' })
};
