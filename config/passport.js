/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
var LocalStrategy = require('passport-local').Strategy;
var QQStrategy= require('passport-qq').Strategy;
var WeiboStrategy = require('passport-weibo').Strategy;
var RenrenStrategy = require('passport-renren').Strategy;
var Users = mongoose.model('User');
var Providers = mongoose.model('Auth');


/*Check whether current user who login through external provider is registered already, 
   return user if already connected, else return null*/
var isConnectedProvider = function(provider_id, provider,callback) {
   var q = Providers.findOne({provider_id:provider_id,provider:provider});
   q.exec(function(err, providerUser){
     if (err) throw err;
     if (providerUser.user) { // already connected
       Users.findOne({email:providerUser.user},function(err,user){
        if (err) throw err;
        callback(user);
       }); 
     } else { //not linked yet
        callback(null);
     }
   })
} 


/*Connect user with a provider*/
var connectProvider = function(user,provider,provider_id,callback) {

}
/*Disconnect user with a provider*/
var disconnectProvider = function(user,provider,provider_id,callback) {

}


var compilePath = function(provider, callbackPath) {
	var patt=/:provider/g;
	patt.compile(patt); 
	str2=callbackPath.replace(patt,provider);	
	return str2;
}

module.exports = function (app,passport, config) {
	var provider = config.provider;
	var env = app.get('env');
	var callback = provider.callback[env];
  
  // Common verify callback for passport auth for third party provider
	var varifyCallback = function(req,accessToken, refreshToken, profile, done) {
    var provider = profile.provider;
    console.log(provider + " user is logging in:" + profile.nickname);
    Providers.findOne({provider:provider,provider_id:profile.id},function(err, providerUser){
       if (err) throw err;
       if (profile._raw) delete profile._raw; // remove the unnecessary raw data
       var data = {provider:provider,provider_id:profile.id,accessToken:accessToken,profile:profile};
       if (refreshToken) data.refreshToken = refreshToken; // some auth don't have this field
       if (!providerUser) { 
          // if first time using provider login, create a provider user
          Providers.create(data,function(err,u){
            var hash = u.hash();
            done(err, false, {provider:provider,provider_id:profile.id,hash:hash});
          });
        } else if (providerUser.user){ 
          // if this providerUser is linked with local user already, then update the accesstoken and return the localuser
          providerUser.update(data,function(err,u){
            Users.findOne({_id:providerUser.user},function(err, user){
              done(err,user);
            })
          });
        } else {
          // else update the provider user
          providerUser.update(data,function(err,u){
             var hash = providerUser.hash();
             done(err, false, {provider:provider,provider_id:profile.id,hash:hash});
          });
        } 
    })
  }
	/* Local strategy */
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
   	 	},
    	function(email, password, done) {
    			Users.isValidUserPassword(email, password, done);
    }));
	
  
	/* Weibo strategy */
	var weiboCallback = compilePath("weibo",callback);
	// Store the compiled callback into configuration
	config.provider.weibo.callback = weiboCallback;
  // Extract info from weibo callback
  var weiboCallbackFunction = function(req,accessToken, refreshToken, profile, done) {
     if (profile) {
         var nickname = profile.nickname;
         var avatar = {tiny:profile.avatarUrl,middle:profile._json.avatar_large, large:profile._json.avatar_hd};
         var gender = profile._json.gender === 'm' ? 'male' : 'female';
         profile.nickname = nickname;
         profile.avatar = avatar;
         profile.gender = gender;
         profile.provider_chinese = '新浪微博'; 
     }
     varifyCallback(req,accessToken, refreshToken, profile, done);
  }
	passport.use(new WeiboStrategy({
		clientID: provider.weibo.id,
		clientSecret: provider.weibo.secret,
		callbackURL: weiboCallback,
    passReqToCallback: true // attach req in the callback's first param
	  },
    weiboCallbackFunction
	));

	/* QQ strategy */
	var qqCallback = compilePath("qq",callback);
	config.provider.qq.callback = qqCallback;
  var qqCallbackFunction = function(req,accessToken, refreshToken, profile, done) { 
    if (profile) {
         var nickname = profile.nickname;
         var avatar = {tiny:profile._json.figureurl,middle:profile._json.figureurl_1, large:profile._json.figureurl_2};
         var gender = profile._json.gender == '男' ? 'male' : 'female';
         profile.provider_chinese = '腾讯QQ';
         profile.nickname = nickname;
         profile.avatar = avatar;
         profile.gender = gender;
     }
     varifyCallback(req,accessToken, refreshToken, profile, done);
  }
	passport.use(new QQStrategy({
		clientID: provider.qq.id,
		clientSecret: provider.qq.secret,
		callbackURL: qqCallback,
    passReqToCallback: true
	  },
	  qqCallbackFunction
	));
  
  
 /* Renren strategy */
  var renrenCallback = compilePath('renren',callback);
  config.provider.renren.callback = renrenCallback;
  var renrenCallbackFunction =  function(req,accessToken, refreshToken, profile, done) { 
     if (profile) {
         var nickname = profile.name;
         var avatars = profile._json.avatar; // renren has an array of avatars
         var avatar = {tiny:avatars[0].url,middle:avatars[2].url, large:avatars[3].url};
         var gender = profile._json.basicInformation.sex == 'MALE' ? 'male' : 'female';
         profile.provider_chinese = '人人';
         profile.nickname = nickname;
         profile.gender = gender;
         profile.avatar = avatar;
     }
     varifyCallback(req,accessToken, refreshToken, profile, done);
  }
  passport.use(new RenrenStrategy({
    clientID: provider.renren.id,
    clientSecret: provider.renren.secret,
    callbackURL: renrenCallback,
    passReqToCallback: true
  },
  renrenCallbackFunction
  ));	
  
  /*Defines how sessions are serialized and de-serialized*/
	passport.serializeUser(function(user, done) {
		done(null, {id:user._id,username:user.username});
	});

	passport.deserializeUser(function(user, done) {
		Users.findOne({ _id:user.id, username:user.username}, function (err, user) {
			done(err, user);
		});
	});
	
}

