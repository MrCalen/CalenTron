var fs = require("fs");
var ini = require('ini');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

var file = config.server.database;
var exists = fs.existsSync(file);
if (exists) {
    fs.unlink(file);
}

fs.openSync(file, "w");

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
db.serialize(function() {
    db.run("CREATE TABLE users(login VARCHAR(255) PRIMARY KEY, password VARCHAR(255))");
    db.run('CREATE TABLE tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, solved INT)');

    var insert = db.prepare("INSERT INTO users VALUES(?, ?)");
    insert.run(config.user.login, config.user.password);
    insert.finalize();
});