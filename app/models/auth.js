var mongoose = require('mongoose')
var HASH_SECRET = "wowcheer-rocks";
var md5 = require('MD5');
/*Model for third party authentication*/
AuthSchema = mongoose.Schema({
  user:{type:String},
  provider_id:{type:String,required:true,index:true},
  provider:{type:String,required:true,index:true},
  nickname:{type:String},
  avatar: mongoose.Schema.Types.Mixed,
  gender:String,
  accessToken:String,
	refreshToken:String,
	profile:mongoose.Schema.Types.Mixed,
	createdAt:{type:Date,default:Date.now},
  updatedAt:{type:Date}
});

AuthSchema.pre('save', function(next){
  this.updated_at = new Date;
  next();
})

/*Quick method to select secure field from provider user*/
AuthSchema.statics.findOneSecure = function(param,callback) {
    var q = this.findOne(param);
    q.select('-accessToken -refreshToken');
    q.exec(callback);
}

/*Verify cash*/
AuthSchema.statics.varifyHash = function(provider,provider_id,hash){
  return md5(provider + HASH_SECRET + provider_id) === hash;
}
/*Generate hash*/
AuthSchema.methods.hash = function(){
  return md5(this.provider+HASH_SECRET+this.provider_id); 
}

/*Verify auth provider*/
AuthSchema.statics.varifyProvider = function(provider,provider_id,hash,callback) {
  var q = this.findOne({provider:provider,provider_id:provider_id});
  q.exec(function(err,providerUser) {
    if (err) throw err;
    if (providerUser) {
      callback(this.varifyHash(providerUser.provider,providerUser.provider_id,hash),providerUser);
    } else {
      callback(false,null);
    }
  })
};

module.exports = AuthSchema;
