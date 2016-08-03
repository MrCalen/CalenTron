var fs = require("fs");
var CONSTANTS = require('./constants');

var file = CONSTANTS.getDataBaseFile();
var exists = fs.existsSync(file);
if (exists) {
    fs.unlink(file);
}

fs.openSync(file, "w");

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
db.serialize(function() {
   db.run("CREATE TABLE users(login VARCHAR(255), password VARCHAR(255))");
});