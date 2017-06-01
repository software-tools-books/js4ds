const sqlite3 = require('sqlite3');

const Q_WORKSHOP_GET_ALL = `
select
    Workshop.ident		as workshopId,
    Workshop.name		as workshopName,
    Workshop.duration		as workshopDuration
from
    Workshop;
`;

const Q_WORKSHOP_GET_ONE = `
select
    Workshop.ident		as workshopId,
    Workshop.name		as workshopName,
    Workshop.duration		as workshopDuration
from
    Workshop
where
    Workshop.ident = ?;
`

const X_WORKSHOP_DELETE = [
  'delete from Offering where workshop = ?;',
  'delete from Workshop where ident = ?;',
];

class Actions {

  constructor(path) {
    this.path = path;
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) this.fail(`DATABASE OPEN ERROR ${err} for "${path}"`);
    });
  }

  workshop_get_all(args) {
    this.db.all(Q_WORKSHOP_GET_ALL, [], (err, rows) => {
      if (err) this.fail(err);
      this.display(rows);
    });
  }

  workshop_get_one(args) {
    this.db.all(Q_WORKSHOP_GET_ONE, args, (err, rows) => {
      if (err) this.fail(err);
      this.display(rows);
    });
  }

  workshop_delete_one(args) {
    const err = this.transact(X_WORKSHOP_DELETE, args);
    if (err) this.fail(err);
  }

  transact(commands, parameters) {
    this.db.run('begin transaction;', [], function(err){
      if (err) return err;
    });
    for (let i in commands) {
      this.db.run(commands[i], parameters, function(err){
        if (err) return err;
      });
    }
    this.db.run('commit;', [], function(err){
      if (err) return err;
    });
    return null;
  }

  display(rows) {
    for (let r of rows) {
      console.log(r);
    }
  }

  fail(msg) {
    console.log(msg);
    process.exit(1);
  }
}

function main() {
  const path = process.argv[2];
  const action = process.argv[3];
  const args = process.argv.splice(4);

  const actor = new Actions(path);
  actor[action](args);
}

main();
