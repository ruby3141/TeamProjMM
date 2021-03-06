var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//static routes and index redirection
app.use(express.static("static"));
app.get('/', function(req, res, next)
{
	return res.redirect('main.html');
});

//api routes
var api_user = require("./routes/user");
app.use("/api/user", api_user);

var api_group = require("./routes/group");
app.use("/api/group", api_group);

//catch 404 and forwarding to error handler
app.use(function(req, res, next)
{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//error handler.
app.use(function(err, req, res, next)
{
	res.status(err.status || 500);
	console.log(err);
	res.send(err.status + " " + err.message);
});

app.listen(8080, function()
{
	console.log("tproj server listening on port 8080.");
});

module.exports = app;
