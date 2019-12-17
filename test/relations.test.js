var request = require('supertest');
var app = require('../app');
var config = app.get('config');

describe('Relations routes', function (argument) {
	
	it("/relations/add", function(done) {
		db.User.find({}, function(err, users) {
			if(!err && users.length != 0) {
				request(app).get('/relations/add?from=' + users[0]._id + '&to=' + users[1]._id)
					.expect(302, done)
			}
		});
	});

	
})