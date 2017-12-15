var express = require('express');
var sqlite3 = require('sqlite3');
var jwt = require('jsonwebtoken');

var config = require('../config');
var router = express.Router();
var db = new sqlite3.Database("data.db");

router.post('/login', function(req, res, next)
{
	var success = true;
	db.get("SELECT sid FROM student WHERE strid = ? AND password = ?",
		(req.body.id, req.body.passwd),
		(err, row) => { if(err) success = false; else res.cookie("token",
			jwt.sign({ sid: row.sid }, config.secret, { expireIn: "2h"})); },
		() => { res.json({ "success" : success }) });
});

router.get('/contact/list', function(req, res, next)
{
	jwt(req.cookies["token"], config.secret, function(e, decoded)
	{
		if(e) var err = new error("Unauthorized");
		else var sid = decoded["sid"]
	});
	if(err) { res.status = 401; next(err); }
	else
	{
		var cts = [];
		db.each("SELECT cid, ctype, contact FROM contact WHERE sid = ?", (sid),
			(err, row) => { cts.push({ id: row.cid, type: row.ctype, value: row.contact }); },
			() => { res.json({ contact: cts }); });
	}
});

router.post('/contact/add', function(req, res, next)
{
	jwt(req.cookies["token"], config.secret, function(e, decoded)
	{
		if(e) var err = new error("Unauthorized");
		else var sid = decoded["sid"]
	});
	if(err) { res.status = 401; next(err); }
	else
	{
		var success = true;
		if(typeof res.body.type === "string" && typeof res.body.value === "string")
			db.run("INSERT INTO contact(sid, ctype, contact) VALUES(?, ?, ?)",
				(sid, res.body.type, res.body.value),
				(err) => { if(err) success = false; res.json({ success: success }); });
	}
});

module.exports = router;
