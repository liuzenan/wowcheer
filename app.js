/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require("passport");
var mongoose = require("./app/models/models");
var initialize = require("./init");
var config = require('./config/config');
var env = config.env();
var routes = require('./routes');
var fs = require('fs')
var time = require('./app/util/the_time');

var app = module.exports = express();


// Configuration
app.configure(function(){
	// all environments
	app.set('env',env.mode);
	app.set('port', env.port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options');
	app.use(express.methodOverride());
	app.use(express.cookieParser(env.server_secret));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.session({ secret:env.server_secret,cookie: { maxAge: 60000 * 60 * 24 }}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(path.join(__dirname, 'public')));
	// Define global returning json format
	app.use(function(req,res,next){
		res._json = function(status, data, errorCode) {
			if (status) {
				var status = 'success';
			} else {
				var status = 'fail';
			}
			var data = data || {};
			var errorCode = errorCode ? errorCode : 200;
      if (errorCode && errorCode != 200) {
        res.send(errorCode);
      } else {
        res.send({status:status,data:data});
      }
		}
		next();
	})
	// Attach title,user info to all page rendering
	app.use(function(req, res, next) {
    res.locals.title = "我去"
		res.locals.user = req.user;
    res.locals.timeFormatter = time.timeFormatter;
    res.locals.get_time_difference = time.get_time_difference;
		next();
	});
	app.use(app.router);
	
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler()); 
});

// connect database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function callback () {
	console.log("mongodb successfully connected");
   // Initialize data 
	initialize();
});

mongoose.connect(env.db,env.dbConfig);

// set up passport
require('./config/passport')(app,passport,config);

// set up routes
require('./routes')(app,passport,db,config)

http.createServer(app).listen(app.get('port'), function(){
  console.log('server ('+app.get('env')+') listening on port ' + app.get('port'));
});
