var request = require('supertest');
var app = require('../app');
var config = app.get('config');

describe('Users routes', function (argument) {
	
	it("/user/signin", function(done) {
		request(app).get('/user/signin')
			.expect(200, done)
	})

	it("/user/signup", function(done) {
		request(app).get('/user/signup')
			.expect(200, done)
	})

	it("/user/recover", function(done) {
		request(app).get('/user/recover')
			.expect(200, done)
	})

	it("/user/activate", function(done) {
		request(app).get('/user/activate?_id=' + '123')
			.expect(404, done)
	})

	it("/user/deactivate", function(done) {
		request(app).get('/user/activate?_id=' + '123')
			.expect(404, done)
	})
	
	it("/user/activate", function(done) {
		db.User.find({}, function(err, users) {
			if(!err && users.length != 0) {
				request(app).get('/user/activate?_id=' + users[0]._id)
					.expect(302, function() {
						request(app).get('/user/activate?_id=' + users[1]._id)
							.expect(302, done)	
					})
			}
		});
	})

	it("/user/deactivate", function(done) {
		db.User.find({}, function(err, users) {
			if(!err && users.length != 0) {
				request(app).get('/user/deactivate?_id=' + users[0]._id)
					.expect(302, function() {
						request(app).get('/user/deactivate?_id=' + users[1]._id)
							.expect(302, done)	
					})
			}
		});
	})

	it("/user/signup", function(done) {
		request(app).post('/user/signup')
			.send({
				email: 'mentorkyrgyzstan@gmail.com',
				password: 'somePass',
				status: false
		}).expect(200, done)
	})
	
	it("/user/signup", function(done) {
		request(app).post('/user/signup')
			.send({
				email: 'Talantbekov_k@auca.kg',
				password: 'somePass',
				status: false
		}).expect(201, done)
	})

	it("/user/signin", function(done) {
		request(app).post('/user/signin')
			.send({
				email: 'mentorkyrgyzstan@gmail.com',
				password: 'somePass'
		}).expect(401, done)
	})

	it("/user/signin", function(done) {
		db.User.findOneAndUpdate({email: 'talantbekov_k@auca.kg'}, {$set: {verified : true}}, function(err, user){
			request(app).post('/user/signin')
				.send({
					email: 'talantbekov_k@auca.kg',
					password: 'somePass'
			}).expect(302, done)
		});
	})

})