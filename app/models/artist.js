/*Artist schema, model and model behaviours*/
var mongoose = require('mongoose');
var artistSchema =  mongoose.Schema({
		name: String,
		birthday:String,
		introduction:String,
		poster:String,
    poster_large:String,
		createdAt: { type: Date, default: Date.now }
})
module.exports = artistSchema;
