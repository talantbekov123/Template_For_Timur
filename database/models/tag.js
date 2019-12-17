var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: Number,
		required: true
	}
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = function(registry) {
	registry['Tag'] = Tag;
};