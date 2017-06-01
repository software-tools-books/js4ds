-- Delete all tables (bottom-up).
drop table if exists Offering;
drop table if exists Workshop;

-- Workshops that could be offered.
create table Workshop(
	ident		integer unique not null primary key,
	name		text unique not null,
	duration	text not null -- HH:MM duration
);

insert into Workshop values(1, "Building Community", "1:00");
insert into Workshop values(2, "ENIAC Programming", "2:30");

-- Particular offerings of workshops.
create table Offering(
	ident		integer unique not null primary key,
	workshop	integer not null,
	start		text not null -- YYYY-MM-DDTHH:MM instant
);

insert into Offering values(1, 1, '1951-01-01T09:00'); -- Community #1
insert into Offering values(2, 1, '1951-01-03T13:00'); -- Community #2
insert into Offering values(3, 1, '1951-02-28T11:00'); -- Community #3
insert into Offering values(4, 2, '1951-01-03T10:30'); -- ENIAC #1
insert into Offering values(5, 2, '1951-02-14T19:00'); -- ENIAC #2
