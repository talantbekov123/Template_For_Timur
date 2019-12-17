var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
		title: {
			type: String,
			required: true
		},
		questions: {
			type: [Schema.Types.ObjectId],
			ref: 'Question',
			required: true
		},
	}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var Test = mongoose.model('Test', TestSchema);

module.exports = function(registry) {
	registry['Test'] = Test;
};