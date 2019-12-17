var express = require('express');
var router = express.Router();

module.exports = function(app, db) {
	
	router.get('/', function(req, res) {
		res.render('index', {});
	});

	router.get('/about', function(req, res) {
		res.render('about', {});
	});

	router.get('/founders', function(req, res) {
		res.render('founders', {});
	});

	router.get('/why/mentor', function(req, res) {
		res.render('whymentor', {});
	});

	router.get('/why/mentee', function(req, res) {
		res.render('whymentee', {});
	});

	router.get('/info', function(req, res) {
		message = req.query.message;
		res.render('info', {message: message});
	});

	app.use('/', router);
};