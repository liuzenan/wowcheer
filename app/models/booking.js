var mongoose = require('mongoose');
var BookingSchema = mongoose.Schema({
    project:{type:Number,ref:"Project"},
    user:{type:Number,ref:"User"},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
    tickets:[{ticket_price:Number,ticket_count:Number}],
    paid:{type:Boolean,default:false}
});
BookingSchema.pre('save',function(next){
  this.updatedAt = new Date();
  next();
});

module.exports = BookingSchema;