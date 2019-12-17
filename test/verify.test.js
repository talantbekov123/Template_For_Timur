var request = require('supertest');
var app = require('../app');
var config = app.get('config');

describe('Verify routes', function (argument) {
    
	it("/verify", function(done) {
		db.User.findOne({email: 'talantbekov_k@auca.kg'}, function(err, user) {
			if(user) {
				request(app).get('/verify?hash=' + user.hash)
					.expect(200, done)
			}
		});
	});

	
})