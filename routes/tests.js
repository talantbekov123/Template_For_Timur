var express = require('express');
var router = express.Router();

module.exports = function(app, db) {
	
	router.post('/',async function(req, res) {
		let questions = await db.Question.find({});
		let ids = []
		for(let i  = 0; i < questions.length; i++) {
			ids.push(questions[i]._id)
		}

		await db.Test.create({
			title: req.body.title,
			questions: ids
		});

		res.send('Created test')

	});



	router.get('/',async function(req, res) {
		let test = await db.Test.find({}).populate('questions');
		res.send(test);

	});

	app.use('/tests', router);
};