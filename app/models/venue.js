/*Venue schema, model and model behaviours*/
var mongoose = require('mongoose');
var venueSchema = mongoose.Schema({
		name:{type:String,index:true},
		description:String,
		image:String,
		address:String,
		createdAt: { type: Date, default: Date.now }
	})
// Bootstrap models
module.exports = venueSchema;
