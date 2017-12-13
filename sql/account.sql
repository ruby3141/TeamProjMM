create table professor
(
	profid integer primary key autoincrement,
	name char not null,
	password char not null
);

create table student
(
	sid integer primary key,
	name char not null,
	password char not null
);

create table contact
(
	sid integer not null,
	ctype char not null,
	contact char not null
);

create table class
(
	classid char primary key,
	profid integer not null,
	name char not null,
	foreign key(profid) references professor(profid)
);

create table attend
(
	sid integer not null,
	classid integer not null,
	foreign key(sid) references student(sid),
	foreign key(classid) references class(classid)
);
