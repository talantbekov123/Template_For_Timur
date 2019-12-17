var app = require('../app');
var config = app.get('config');

db.connect(config.TEST_DB_URL).connection.once('open', function() {
	var obj = db.connect(config.TEST_DB_URL).connection.models;
	models = Object.keys(obj);
	models.forEach(function(model) {
		obj[model].remove({}, function(err) { 
			console.log(err);
		});
	})
});
