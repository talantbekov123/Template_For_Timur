var glob = require('glob');
var path = require('app-root-path').path;
var seeders = glob.sync(path + '/seeders/seeds/*.js');
var app = require(path + '/app');
var config = app.get('config');
var db = require(path + '/database/index')(path + '/database/models/*.js');
 
db.connect(config.TEST_DB_URL).connection.once('open', function(err) {
	var index = 100;
	seeders.forEach(function(seed) {
		setTimeout(function() {
			require(seed)(db, config);
		}, index);
		index += 500;
	});
});
