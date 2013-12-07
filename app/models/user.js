var mongoose = require('mongoose');
var hash = require('../util/hash');

UserSchema = mongoose.Schema({
    email:      {type:String,index:{unique:true}} ,//ID
    salt:       String,
    hash:       String,
    username:String,
		city:String,
		description:String,
    createdAt:{type:Date,default:Date.now},
		updatedAt: { type: Date}
});

UserSchema.pre('save', function(next){
  this.updated_at = new Date;
  next();
})

UserSchema.statics.isExistingUser = function(email, done) {
	this.count({email:email},function(err, count){
			if (err) throw err;
			if(count == 0) {
				done(false);
			} else {
				done(true)
			}
	});
}



// For signup:
UserSchema.statics.signup = function(email, password, done){
	var User = this;
	hash(password, function(err, salt, hash){
			if(err) throw err;
			
			User.create({
					email : email,
					salt : salt,
					hash : hash
			}, function(err, user){
					if(err) throw err;
				
					done(null, user);
			});
	});
}

UserSchema.statics.update = function(email, data,done) {
	this.findOne({email:email}, function(err, user){
		if (err) throw err;
		console.log(user);
		user.username = data.username;
		user.city = data.city;
		user.description = data.description;
		user.updatedAt = Date.now();
		user.save();
		done(err)
	});
}

// For login
UserSchema.statics.isValidUserPassword = function(email, password, done) {
        this.findOne({email : email}, function(err, user){
                // if(err) throw err;
                if(err) return done(err);
                if(!user) return done(null, false, { message : 'Incorrect email.' });
                hash(password, user.salt, function(err, hash){
                        if(err) return done(err);
                        if(hash == user.hash) return done(null, user);
                        done(null, false, {
                                message : 'Incorrect password'
                        });
                });
        });
};
module.exports = UserSchema;
