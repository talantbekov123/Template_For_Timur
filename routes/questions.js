var express = require('express');
var router = express.Router();

module.exports = function(app, db) {
	
	router.post('/', async function(req, res) {
		await db.Question.create({
			text: req.body.text
		});

		res.send('Created question')
	});

	app.use('/questions', router);
};