var crypto = require('crypto');

module.exports = function(data) {
	var salt = 'somemetorsalt';
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	var hash = crypto.createHash('sha1').update(data + salt).digest('hex');
	return hash;
}