module.exports = function(app, db) {
	app.use(function(req, res, next) {
		db.Message.find({to: res.locals.authorized._id, status: false}, function(err, messages) {
			res.locals.messageCount = messages.length;
			next();
		});
	});
};