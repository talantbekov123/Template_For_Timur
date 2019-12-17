var express = require('express');
var router = express.Router();
var sendMail = require('../custom/sendMail');

module.exports = function(app) {
	router.get('/', function(req, res) {
		db.Relationship.find({$or:[ {'from': res.locals.authorized._id},
		{'to': res.locals.authorized._id }]}).populate('from to').exec(function(err, users){
			db.Message.find({$or:[ {'from': res.locals.authorized._id},
			{'to': res.locals.authorized._id }]}).populate('from to').sort({'created_at': -1}).exec(function(err, messages){
				db.Message.update({to: res.locals.authorized._id, status: false}, {$set: {status : true}}, {"multi": true}, function(err){
					res.locals.messageCount = 0;
					res.render('message', {friend_list: users, messages: messages});
				});
			});
		});	
	});

	router.post('/send', function(req, res) {
		db.User.findOne({_id: req.body.from}, function(err, from_user) {
			db.User.findOne({_id: req.body.to}, function(err, to_user) {
				var from = req.body.from;
				var to = req.body.to;
				var newMessage = new db.Message({
					from: req.body.from,
					to: req.body.to,
					message: req.body.message
				});
				newMessage.save(function(err, message) {
					if(from_user.email == 'admin') {
						sendMail(to_user.email, 'Mentor.kg Admin', 'Dear ' + to_user.name + ',\n\n' + req.body.message + '\n\nSincerely, Mentor.kg team', false);
						return res.send('Message and email send to user ' + to_user.name + ',' + to_user.email);
					} else {
						return res.redirect('/message');
					}
				});
			});
		});
	});

	app.use('/message', router);
};
