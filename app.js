/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require("passport");
var mongoose = require("mongoose");
var initialize = require("./init");
var config = require('./config/config');
var env = config.env();
var routes = require('./routes');
var fs = require('fs')

var app = module.exports = express();

// Configuration

app.configure(function(){
	// all environments
	app.set('env',env.mode);
	app.set('port', env.port);
	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false
	});
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.session({ secret: 'really cool website' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(__dirname + '/public'));
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
	// Load predefined data
	initialize();
});
mongoose.connect(env.db);
// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
	 if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file)
})

// set up passport
require('./config/passport')(passport,config);

// set up routes
require('./routes')(app,passport,db)

http.createServer(app).listen(app.get('port'), function(){
  console.log('server ('+app.get('env')+') listening on port ' + app.get('port'));
});