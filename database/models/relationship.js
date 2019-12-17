var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var relationshipSchema = new Schema({
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
		status: {
			type: Number,
			default: 0
		}
	}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});
relationshipSchema.index({from: 1, to: 1}, {unique: true});
var Relationship = mongoose.model('Relationship', relationshipSchema);

module.exports = function(registry) {
	registry['Relationship'] = Relationship;
};