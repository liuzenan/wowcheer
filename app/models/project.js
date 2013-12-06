var mongoose = require("mongoose");
var lastModified = require("./plugins").lastModifiedPlugin;
var ProjectSchema = mongoose.Schema({
        visible:{type:Boolean,default:true},
		name:String,
		types:{type:[{type:String}],default:['流行']},
        description:String,
        main_poster_url:String,
        video_url:String,
		city:String,
		presale_start_time:Date,
		confirm_time:Date,
		performance_time:Date,
		ticket_prices:[Number],
		sale_limit:Number,
		venue:{type:Number,ref:"Venue"},
		artist:{type:Number,ref:"Artist"},
		bookingCount:Number,
		comments:[{content:String,user:String,createdAt:{ type: Date, default: Date.now }}],
		createdAt: { type: Date, default: Date.now }
});

ProjectSchema.statics.featureProjects = function(callback,limit){
	var limit = limit || 50;
	var q= this.find({
					visible:true, 
          performance_time:{$gt:new Date()}
					}).populate("venue artist").sort("bookingCount").limit(limit);
	q.exec(function(err,projects){
					if (err) return callback(err);
					else return callback(null,projects);
			});
}

// Record last modified date
ProjectSchema.plugin(lastModified);

module.exports = ProjectSchema