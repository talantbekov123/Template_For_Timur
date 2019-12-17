var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
		from: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		to: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		message: {
			type: String,
			required: true
		},
		status: {
			type: Boolean,
			default: false,
			required: true
		}
	}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var Message = mongoose.model('Message', messageSchema);

module.exports = function(registry) {
	registry['Message'] = Message;
};