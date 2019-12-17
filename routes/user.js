var express = require('express');
var router = express.Router();
var sendMail = require('../custom/sendMail');
var generateHash = require('../custom/generateHash');
var bruteforce = require('../custom/brute-force');
var validator = require("email-validator");

module.exports = function(app, db) {

	router.get('/signin', function(req, res) {
		res.render('signin', {message: ''});
	});

	router.get('/signup', function(req, res) {
		res.render('signup', {message: ''});
	});

	router.get('/recover', function(req, res) {
		res.render('recover', {});
	});

	router.post('/signup', bruteforce.prevent , function(req, res) {
		var config = app.get('config');
		var newUser = new db.User({
			email: req.body.email.toLowerCase().trim(),
			password: generateHash(req.body.password),
			status: req.body.status
		});

		/* checkEmail - is it @auca email or not */
		if(req.body.status == 0 && checkEmail(req.body.email) == false) {
			res.status(200).render('signup',{message:'Students can signup only with @auca.kg email.'});
		} else {
			newUser.save(function(err, user) {
				if(err && err.code == '11000') {
					res.status(409).render('signup',{message:'Email already registered, chose another email'});
				} else if(err) {
					res.status(404).render('signup',{message: 'Error occured during registration'});
					throw err;
				} else if(!validator.validate(req.body.email)) {
					res.status(409).render('signup',{message:'Not valid email'});
				} else if(req.body.password.length == 0) {
					res.status(409).render('signup',{message:'Password can\'t be empty'});
				} else {
					var hash = generateHash((new Date()).valueOf().toString());
					var subject = 'Let\'s get started'
					var text = `Thanks for getting started with Mentor.kg! We need a little more information to complete your registration,including confirmation of your email address.\n\nClick below to confirm your email address:\n`+  config.D_URL + 'verify?hash=' + hash + `\nIf you have problems, please paste the above URL into your web browser.We attached additional information for you, please read it.\n\nSincerely, Mentor.kg team` ;
					sendMail(config.GMAIL, config.GMAIL_PASS, req.body.email, subject, text, true);
					db.User.findOneAndUpdate({_id: user._id}, {$set: {hash : hash}}, function(err, user){
						res.status(201).render('info-sub',{message:'We send verification message to ' + req.body.email + ', verify your email.'});
					});
				}
			});
		}
	});

	router.post('/signin', bruteforce.prevent, function(req, res) {
		console.log(req.body.email.toLowerCase().trim());
		db.User.findOne({ verified: true, email: req.body.email.toLowerCase().trim(), password: generateHash(req.body.password)}, function (err, user) {
			if(user) {
				res.cookie('user', user );
				return res.status(200).redirect('/profiles/private');
			} else {
				res.status(401).render('signin',{message:'Incorrect email or password'});
			}
		});
	});

	router.post('/recover', bruteforce.prevent, function(req, res) {
		db.User.findOne({ email: req.body.email.toLowerCase().trim() }, function (err, user) {
			var randomString = makeid();
			db.User.findOneAndUpdate({_id: user._id}, {$set: {password: generateHash(randomString)}}, function(err, updated){
				/* if such user found, then send email */
				if(user) {
					var text = 'Hi ' + user.name + ' we received request to recover your password.\nYour password is \"' + randomString + '\"\nIf you didn\'t request to recover your password please ignore this message.\n\nSincerely, Mentor.kg team';
					sendMail(config.GMAIL, config.GMAIL_PASS, user.email, 'Password recover', text);
					res.render('signin',{message:'We send password recover to ' + user.email});
				}
			});
		});
	});

	router.get('/activate',function(req, res) {
		db.User.findOneAndUpdate({_id: req.query._id, active: false}, {$set: {active : true}}, function(err, user){
			if(err) {
				res.status(404).send('User not found.');
			} else if(user){
				var subject = 'Profile activated';
				var text = 'Hi ' + user.name + '! Your profile has been activated. \n\nSincerely, Mentor.kg team' 
				sendMail(config.GMAIL, config.GMAIL_PASS, user.email, subject, text);
				return res.redirect('/admin');
			} else {
				return res.redirect('/admin');
			}
		});
	});

	router.get('/deactivate',function(req, res) {
		db.User.findOneAndUpdate({_id: req.query._id, active: true}, {$set: {active : false}}, function(err, user){
			if(err) {
				res.status(404).send('User not found.');
			} else {
				return res.redirect('/admin');
			}
		});
	});

	app.use('/user', router);
};

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 8; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

var checkEmail = function(email) {
	if(email == 'interierweb@gmail.com' || email == 'talantbekov123@gmail.com') {
		return true;
	}
	var last = email.slice(-8);
	if(last === '@auca.kg' && email.length >= 10) {
		return true;
	}
	return false;
}