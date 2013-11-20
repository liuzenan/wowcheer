
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require("passport");
var mongoose = require("mongoose");

var config = require('./config/config');
var env = config.env();
var routes = require('./routes');

var app = express();

// all environments
app.set('env',env.mode);
app.set('port', env.port);
app.set('views', path.join(__dirname, 'app/views'));

// all middle ware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'really cool website' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// connect database
mongoose.connect(env.db);

// set up passport
require('./config/passport')(passport,config);

// set up routes
require('./routes')(app,passport)

http.createServer(app).listen(app.get('port'), function(){
  console.log('server ('+app.get('env')+') listening on port ' + app.get('port'));
});
