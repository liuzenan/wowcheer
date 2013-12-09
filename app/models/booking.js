var mongoose = require('mongoose');
var BookingSchema = mongoose.Schema({
    project:{type:String,ref:"Project"},
    user:{type:String,ref:"User"},
    number:{type:Number,default:1},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
    pricePackage:{type:Number},
    paid:{type:Boolean,default:false}
});
BookingSchema.pre('save',function(next){
  this.updatedAt = new Date();
  next();
});

module.exports = BookingSchema;