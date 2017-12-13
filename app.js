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

//login check. return 401 when user request nonstatic contents without login.
app.use(function(req, res, next)
{
	if(false) //TODO: fill up for login token check
	{
		var err = new Error("Not Authentificated");
		err.status = 401;
		res.status(401);
		res.render('error', {
			message: err.message,
			error: err
		});
	}
	else next();
})

//TODO: api routes

// catch 404 and forwarding to error handler
app.use(function(req, res, next)
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler, prints stacktrace
if (app.get('env') === 'development')
{
    app.use(function(err, req, res, next)
	{
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler. no stacktraces leaked to user
app.use(function(err, req, res, next)
{
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8080, function()
{
	console.log("tproj server listening on port 8080.");
});

module.exports = app;
