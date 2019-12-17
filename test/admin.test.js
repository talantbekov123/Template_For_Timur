var request = require('supertest');
var app = require('../app');
var config = app.get('config');

describe('Admin routes', function (argument) {
    
	it("/admin", function(done) {
		request(app).get('/admin')
			.expect(302, done)
	});

	/*add case when res.locals is admin email*/

})