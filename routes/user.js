
/*
 * User related route
 */
var Auth = require('./middlewares/authentication');
var mongoose = require('mongoose')
var Users = mongoose.model('User');
var Providers = mongoose.model('Auth');
var Util = require('./util');
module.exports = function(app,passport){
	/*Auth*/
	app.get("/login", function(req, res){
		if (req.user) {
			res.redirect("/profile")
		} else {
			res.render("login",{title:'登陆'});
		}
	});

	app.post("/login", function(req,res,next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.render('login', {message:info.message}); 
      } else {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/profile');
        });
      }
    })(req, res, next);
  });
	
	app.get("/signup", function (req, res) {
		if (req.user) {
			res.redirect("/profile");
		} else {
      res.render("signup",{title:"注册"});
    }
	});

	app.post("/signup", function (req, res,next) {
    
		var email = req.param('email');
		var password = req.param('password');
		var confirmPassword = req.param('password_confirm');
		var username = req.param('username');
    var city = req.param('city');
    
    if (!(email && password && confirmPassword && username)) {
      return res._json(false,{password:"缺少注册资料"});
    }
    
		if (password!=confirmPassword) {
			return res._json(false,{password:"请输入相同密码"});
		} else if (!Util.validateEmail(email)) {
			return res._json(false,{email:"邮箱格式不正确"});
		} else if (password.length < 6){
			return res._json(false,{password:"密码至少六位"})
		}
		Users.isExistingUser(email,function(isExistingUser){
			if (isExistingUser) {
				res._json(false, {email:'邮箱已被注册'});
			} else {
        var info = {email:email,username:username,city:city};
				Users.signup(password, info, function(err, user, opt){
					if(err) throw err;
					req.login(user, function(err){
						if(err) return next(err);
            return res.redirect("/profile");
					});
				});
			}
		});
	});


	app.get('/:provider/bind',function(req,res,next){
      if (!req.cookies.provider_info) return res.redirect('/login');
      var provider_id = req.cookies.provider_info.provider_id;
      var provider = req.cookies.provider_info.provider;
      if (provider != req.param('provider') || !provider_id) return res.redirect('/login');
      Providers.findOneSecure({provider_id:provider_id,provider:provider}, function(err, providerUser){
          if (err) next(err);
          if (!providerUser) return res.redirect('/login');
          var hash = req.cookies.provider_info.hash;
          if (providerUser.hash() != hash) return res.redirect('/login'); //invalid cookie
          return res.render("bind",{providerUser:providerUser.profile,titile:"连接我去"})
      });
  });
	
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
	
	app.get('/auth/:provider', 
		function(req,res,next) {
			passport.authenticate(req.params.provider)(req, res,next);
		}
  );
  
  /*Auth callback*/
	app.get('/auth/:provider/callback',  function (req,res,next){
      if (!req.param('code')) { // Something went wrong
         var url ="/login";
         return res.redirect('redirect?redirect_url='+ encodeURIComponent(url));
      }
			passport.authenticate(req.params.provider, function(err,user,info){
        if (err) throw err;
        if (user) {
         // if user exists and connect with provider
         req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/profile');
          });
        } else {
         // else first time login with current provider, goto bind page, set auth cookie
          var five_minutes = 60 * 1000 * 5;
          res.cookie('provider_info',info,{maxAge:five_minutes});
          var url = '/' + info.provider + '/bind';
          return res.redirect('redirect?redirect_url='+ encodeURIComponent(url));
        }
      })(req, res,next);
  });
	
};
