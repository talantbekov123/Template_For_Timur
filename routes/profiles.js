var express = require('express');
var router = express.Router();
/* libraries for photo upload */
var multer = require('multer');
var upload = multer({dest: './public/images'});
const fs = require('fs');
var generateHash = require('../custom/generateHash');

module.exports = function(app, db) {
	router.get('/', function(req, res) {
		db.User.find({status: 0, active: 1 },function(err, users){
			users.forEach(function(user) {
				if(user.goal && user.goal.length > 120) {
					user.goal = user.goal.substring(0, 119) + '...';
				}
			});
			res.render('profiles', {users: users});
		});
	});

	router.get('/private', function(req, res) {
		res.render('private', {});
	});

	router.get('/public', function(req, res) {
		db.User.findOne({status: 1, _id:res.locals.authorized._id, active: true },function(err, user){
			if(user) {
				db.User.findOne({_id: req.query._id}, function(err, user){
					res.render('public', {student: user});
				});
			} else {
				res.render('info-sub', {message: 'Only aproved mentors can view student profiles.'});
			}
		});
	});

	router.post('/update/profile',upload.any(), function(req, res) {
		axilary = { 
			name: req.body.name,
			about: req.body.about,
			goal: req.body.goal,
		}

		/* Axilary values, set if exist*/
		if(req.body.year) {
			axilary.year = req.body.year;
		}
		if(req.body.department) {
			axilary.department = req.body.department;
		}

		if( req.files[0] ) {
			axilary.pic = req.files[0].filename;
		}

		db.User.findOneAndUpdate({_id: req.body._id},
			{$set: axilary}, function(err, user){
				if(err) { 
					throw err 
				}
			db.User.findOne({_id: req.body._id}, function(err, user){
				res.cookie('user', user );
				/* If user filled all fields */
				if(user.name && user.about && user.department && user.year) {
					if(!user.status && user.goal) {
						return res.redirect('/info?message=Thank you for filling your profile. Within 12 hours our team will verify your profile if you show high motivation in profile bio and goal. After verification, your profile will be in "Mentees" list and mentors can see it.');
					} else {
						return res.redirect('/info?message=Thank you for filling your profile. Within 12 hours our team will verify your account. After verification you can view student profiles and send requests.');
					}
				} else {
					return res.redirect('/profiles/private');
				}
			});
		});
	});

	router.get('/update/password', function(req, res) {
		db.User.findOne({_id: req.query._id}, function(err, user){
			if(generateHash(req.query.oldPassword) == user.password && req.query.confirmPassword == req.query.newPassword) {
				db.User.findOneAndUpdate({_id: req.query._id},
					{$set: {password: generateHash(req.query.newPassword)}}, function(err, user){
					return res.redirect('/info?message=Your password updated.');
				});
			} else if(req.query.confirmPassword !== req.query.newPassword) {
				return res.redirect('/info?message=New password confirmation do not match, go to profile and try again.');
			} else {
				return res.redirect('/info?message=Wrong old password , go to profile and try again.');
			}
		});
	});

	router.get('/logout', function(req, res) {
		res.cookie('user', null, { maxAge: 0, httpOnly: true });
		return res.redirect('/');
	});

	router.get('/mentors', function(req, res) {
		db.User.find({ admin: false, status: 1, active: 1 , _id: { $ne: res.locals.authorized._id }},function(err, users){
			users.forEach(function(user) {
				if(user.about && user.about.length > 120) {
					user.about = user.about.substring(0, 119) + '...';
				}
			});
			res.render('mentor-profiles', {users: users});
		});
	});

	router.get('/mentors-public', function(req, res) {
		db.User.findOne({ status: 1, _id:res.locals.authorized._id, active: true },function(err, user){
			if(user) {
				db.User.findOne({_id: req.query._id}, function(err, user){
					res.render('public', {student: user});
				});
			} else {
				res.render('info-sub', {message: 'Only aproved mentors can view mentor profiles.'});
			}
		});
	});

	app.use('/profiles', router);
};