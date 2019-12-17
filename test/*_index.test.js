var request = require('supertest');
var app = require('../app');
var config = app.get('config');

describe('Index routes', function (argument) {
    
    before(function (done) {
        db.connect(config.TEST_DB_URL).connection.once('open', function() {
			console.log('connected to MongoDB, test database');
			done();
		});
    });

	it("/index", function(done) {
		request(app).get('/')
			.expect(200, done)
	});

	it("/about", function(done) {
		request(app).get('/about')
			.expect(200, done)
	});

	it("/fouders", function(done) {
		request(app).get('/founders')
			.expect(200, done)
	});

	it("/why/mentor", function(done) {
		request(app).get('/why/mentor')
			.expect(200, done)
	});

	it("/why/mentee", function(done) {
		request(app).get('/why/mentee')
			.expect(200, done)
	});

	it("/info", function(done) {
		request(app).get('/info')
			.expect(200, done)
	});

	
})