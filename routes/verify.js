var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/', function(req, res) {
		var hash = req.query.hash;
		db.User.findOne({hash: hash}, function(err, user) {
			db.User.findOneAndUpdate({_id: user._id}, {$set: {verified : true}}, function(err, user) {
				if(!err) {
					res.render('signin', {message: 'Your email successfully verified, now you can login.'});
				}
			});
		})
	});

	app.use('/verify', router);
};