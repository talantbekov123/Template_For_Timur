var express = require('express');
var router = express.Router();

module.exports = function(app, db) {
	router.get('/', function(req, res) {

		if(res.locals.authorized.email == 'admin') {
			db.User.find({}, function(err, users) {
				res.render('admin', {users: users});
			});
		} else {
			return res.redirect('/');
		}

	});

	app.use('/admin', router);
};