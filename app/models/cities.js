/*Artist schema, model and model behaviours*/
var mongoose = require('mongoose');
var citySchema =  mongoose.Schema({
		name: String,
})
mongoose.model('City', citySchema);
