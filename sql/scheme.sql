create table student
(
	sid integer primary key autoincrement,
	name char not null,
	strid char not null,
	password char not null
);

create table contact
(
	cid integer primary key autoincrement,
	sid integer not null,
	ctype char not null,
	contact char not null,
	foreign key(sid) references student(sid)
);

create table sgroup
(
	gid integer primary key autoincrement,
	name char not null,
	member integer not null default 0,
	maxmember integer not null
);

create table member
(
	gid integer not null,
	sid integer not null,
	foreign key(gid) references sgroup(gid),
	foreign key(sid) references student(sid)
);

create trigger sgroup_member_add insert on member
begin
	update sgroup set member = member + 1 where gid = new.gid;
end;
