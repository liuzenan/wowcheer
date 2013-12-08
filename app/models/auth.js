var mongoose = require('mongoose')
/*Model for third party authentication*/
AuthSchema = mongoose.Schema({
  user:{type:String},
	provider_id:{type:String,required:true,index:true},
  provider:{type:String,required:true,index:true},
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


module.exports = AuthSchema;