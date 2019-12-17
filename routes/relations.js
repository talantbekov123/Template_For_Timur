var express = require('express');
var router = express.Router();
var sendMail = require('../custom/sendMail');

module.exports = function(app, db) {

	router.get('/add', function(req, res) {
		var config = app.get('config');
		var from_id = req.query.from;
		var to_id = req.query.to;

		var newRelation = new db.Relationship({
			from: from_id,
			to: to_id,
			status: 1
		});

		newRelation.save(function(err, user) {
			db.User.findOne({_id: from_id}, function(err, from_user){
				db.User.findOne({_id: to_id}, function(err, to_user){
					if(!to_user.status) {
						db.User.findOneAndUpdate({_id: to_id}, {$set: {active : false}}, function(err, user){
							var subject = 'Request from mentor';
							var text = 'Hi ' + to_user.name + `! We have good news for you, you received request from mentor.\nNow you can chat with your mentor via messages.\n\nLogin to your account go to messages and start chatting:` + config.D_URL + 'user/signin' + '\nWe attached additional information for you, please read it.\n\nSincerely, Mentor.kg team';
							sendMail(to_user.email, subject, text, true);
							return res.redirect('/info?message=' + 'You send help request to ' + to_user.name + ', now you can chat via messages.');
						});
					} else {
						var subject = 'Friend request';
						var text = 'Hi ' + to_user.name + '! ' + from_user.name + ' added you to his/her friend list.\nNow you can chat with him/her via messages.\n\nLogin to your account go to messages and start chatting:' + config.D_URL + 'user/signin\n\nSincerely, Mentor.kg team';
						sendMail(to_user.email, subject, text);
						return res.redirect('/info?message=' + 'You added ' + to_user.name + ' to your friend list, now you can chat via messages.');
					}
				});
			});
		});
	});

	app.use('/relations', router);
};