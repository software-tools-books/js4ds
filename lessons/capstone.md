---
layout: page
permalink: "/capstone/"
datasource: https://figshare.com/articles/Portal_Project_Teaching_Database/1314459
---

## Introduction

- Bring everything together in an extended example
- A (slightly) interactive visualization of species data from <{{page.datasource}}>
- Plan:
  - Slice data for testing
  - Build database interface class
  - Put data server on top of it
  - Test
  - Build interactive tabular display of data
  - Add visualization
- Will require some new ideas
  - But most work will recapitulate what's come before

## Slicing Data

- Actual data is in a SQL file in <{{page.datasource}}>
- Over 30,000 records
- Create a 1000-record slice for testing
  - Alternative approach: write small program to generate fake data

- Step 1: inspect the source SQL file and find the table(s) we care about
  - In this case, only need `surveys` table

```sql
create table surveys (
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
```

- Step 2: copy a subset of data into a temporary table
  - Temporary tables aren't saved to disk
  - Use `insert into` to copy from one table to another
- How to select randomly?
  - Shuffle and keep the top cards
  - `order by random()`
  - `limit 1000`
  - Only take records whose `record_id` matches one of those

```sql
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
```

- Step 3: save to file
  - `.schema` displays all the table descriptions of the database
  - `.schema TABLE` displays only one
  - Change mode to `insert TABLE` has SQLite display query results as insert statements into a table
    - For exactly this purpose
  - Not something anyone would ever go looking for on their own…
  - …which is another reason novices need tutorials to get started

```sql
.schema surveys
.mode insert surveys
select * from test_surveys;
```

- This sends results to standard output
  - Can redirect to file on command line
  - Could also use `.output FILENAME` to save to a particular file

- Result is `test-data.sql`
  - Use this to create a database with a single `surveys` table
  - Could store the test data in a different table
  - But SQL doesn't allow parameterization of table names

<div class="challenges" markdown="1">

## Challenges

FIXME: write challenges

</div>

{% include links.md %}
