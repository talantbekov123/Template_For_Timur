module.exports = function(db, config) {
	db.User.find({}, function(err, users) {
		const messages = [{
			from: users[0]._id,
			to: users[1]._id,
			message: 'Hello'
		},{
			from: users[0]._id,
			to: users[1]._id,
			message: 'How are you?'
		},{
			from: users[1]._id,
			to: users[0]._id,
			message: 'I\'m fine thanks'
		}];

		for (message of messages) {

			var instance = new db.Message({
				from: message.from,
				to: message.to,
				message: message.message
			});
			
			instance.save(function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Message seeded',err);
			});
		}
	});
}