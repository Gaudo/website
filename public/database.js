var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__APP + 'database.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) { if(err) throw err });

module.exports = db;
