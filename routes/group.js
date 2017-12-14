var express = require('express');
var sqlite3 = require('sqlite3');
var jwt = require('jsonwebtoken');

var config = require('../config');
var router = express.Router();
var db = new sqlite3.Database("data.db");

router.get("/list", function(req, res, next)
{
	var groups = [];
	db.each("SELECT gid, name, member as mem, maxmember as mxm from sgroup",
		(err, row) => { groups.push(
			{ id: row.gid, name: row.name, members: row.mem, maxmembers: row.mxm }) },
		() => { res.json({ groups: groups }) });
});

router.get('/:gid', function(req, res, next)
{
	jwt(req.cookies["token"], config.secret, function(e, decoded)
	{
		if(e) var err = new error("Unauthorized");
		else var sid = decoded["sid"]
	});
	if(err) { res.status = 401; next(err); }
	else
	{
		var members = [];
		db.each("SELECT sid, gid, name FROM member WHERE gid = ?", (req.params.gid),
			function(err, row)
			{
				var contacts = [];
				db.each("SELECT sid, ctype, contact FROM contact WHERE sid = ?", row.sid,
				(err, _row) => { contacts.push({ type: _row.ctype, value: _row.contact }) },
				() => { members.push({ name: row.name, contact: contacts }) });
			},
			function()
			{
				db.get("SELECT gid, name FROM sgroup WHERE gid = ?", (req.params.gid),
				(err, row) => res.json({ name: row.name, member: members }));
			});
	}
});

router.post('/add', function(req, res, next)
{
	jwt(req.cookies["token"], config.secret, function(e, decoded)
	{
		if(e) var err = new error("Unauthorized");
		else var sid = decoded["sid"]
	});
	if(err) { res.status = 401; next(err); }
	else
	{
		if(typeof res.body.name === "string" && typeof res.body.maxmembers === "integer")
			db.run("INSERT INTO sgroup(name, maxmember) VALUES(?, ?)",
				(res.body.name, res.body.maxmembers),
				function(err)
				{
					if(err) res.json({ success: false });
					else db.get("SELECT MAX(gid) as gid FROM sgroup",
					(err, row) => { res.json({ success: true, id: row.gid }) });
				});
	}
});

module.exports = router;
