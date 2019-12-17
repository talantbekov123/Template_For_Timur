var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
		email: {
			type: String,
			unique: true,
			sparse: true
		},
		password: {
			type: String
		},
		name: {
			type: String,
			default: ''
		},
		status: {
			required: true,
			type: Boolean
		},
		year: {
			type: String,
			default: ''
		},
		department: {
			type: String,
			default: ''
		},
		about: {
			type:String,
			default: ''
		},
		goal: {
			type:String,
			default: ''
		},
		pic: {
			type: String,
			default: 'default'
		},
		active: {
			type: Boolean,
			default: false
		},
		verified: {
			type: Boolean,
			default: false
		},
		hash: {
			type: String
		},
		/* added later */
		admin: {
			type: Boolean,
			required: true,
			default: false
		}
	}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var User = mongoose.model('User', userSchema);

module.exports = function(registry) {
	registry['User'] = User;
};