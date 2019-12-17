var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
		text: {
			type: String,
			required: true
		}
	}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = function(registry) {
	registry['Question'] = Question;
};