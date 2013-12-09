var mongoose = require("mongoose");
var lastModified = require("./plugins").lastModifiedPlugin;

var CommentSchema = mongoose.Schema({
    content:String,
    user:{type:String,ref:'User'},
    updatedAt:{type:Date},
    createdAt:{ type: Date, default: Date.now }
});
CommentSchema.pre('save',function(next){
  this.updatedAt = new Date();
  next();
})

var ProjectSchema = mongoose.Schema({
    visible:{type:Boolean,default:true,index:true},
		name:String,
		types:{type:[{type:String}],default:['流行'],index:true},
    description:String,
    main_poster_url:String,
    video_url:String,
		presale_start_time:Date,
		confirm_time:Date,
		performance_time:Date,
		ticket_prices:[Number],
		sale_limit:Number,
    bookingCount:{type:Number,default:0},
		venue:{type:Number,ref:"Venue"},
		artist:{type:Number,ref:"Artist",index:true},
    bookingLimit:{type:Number, default:2},
		comments:[CommentSchema],
		createdAt: { type: Date, default: Date.now }
});

ProjectSchema.statics.types =  ['流行','摇滚','民族','校园','原创','比赛'];



ProjectSchema.methods.addComment = function(user,content,callback){
  this.comments.push({user:user,content:content});
  this.save(callback);
}

// Record last modified date
ProjectSchema.plugin(lastModified);

module.exports = ProjectSchema