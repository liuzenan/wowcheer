/**
 * Base level routes
 */
module.exports = function (app,passport) {
	require('./user')(app,passport);
	
	// index page
	app.get("/", function (req, res) {
		 res.render('index', { title: '我去' })
	});
}

/* GET "404" page. */
exports.lost = function(req, res){
  res.render('index', { title: 'Lost' })
};
 
