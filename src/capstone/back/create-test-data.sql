create temporary table test_surveys (
  record_id INTEGER, 
  year INTEGER, 
  month INTEGER, 
  day INTEGER, 
  plot_id INTEGER, 
  species_id TEXT, 
  sex TEXT, 
  hindfoot_length INTEGER, 
  weight INTEGER
);

insert into test_surveys
select *
from surveys
where record_id in
(select record_id from surveys order by random() limit 1000);

.schema surveys
.mode insert surveys
select * from test_surveys;
