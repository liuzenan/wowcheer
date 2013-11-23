var mongoose = require("mongoose");

ProjectSchema = mongoose.Schema({
        visible:Boolean,
		name:String,
        description:String,
        main_poster_url:String,
        video_url:String,
		city:String,
		presale_start_time:Date,
		confirm_time:Date,
		performance_time:Date,
		ticket_prices:[Number],
		sale_limit:Number,
		venue:mongoose.Schema.Types.ObjectId,
		artist:mongoose.Schema.Types.ObjectId,
		comments:[{content:String,user:mongoose.Schema.Types.ObjectId,createdAt:{ type: Date, default: Date.now }}],
		createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Project", ProjectSchema);