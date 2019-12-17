var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');
var config = require('./config.js');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* Configure database */ 
var db = require('./database/index')('./database/models/*.js');

/* Configure handlers */
var mdHandlers = glob.sync(__dirname + '/middlewares/*.js');
mdHandlers.forEach(function(mdHandler) {
	require(mdHandler)(app, db);
});

/* Configure routes */
var routes = glob.sync('./routes/*.js');
routes.forEach(function(route) {
	require(route)(app, db);
})

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers
if(config.env == 'prod') {
	app.set('config', config.prod);
} else {
	app.set('config', config.dev);
}

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
