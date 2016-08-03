var express = require('express');
var app = express();
var fs = require("fs");
var router = require('./router/routes');

// Fetch Server config
// Put it in global scope, so the jwt accesses it easily
var ini = require('ini');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
global.config = config;



// Fetch database migrate
// Put it in global scope too
var file = global.config.server.database;
var exists = fs.existsSync(file);
if (!exists) {
    console.error('SQL Database could not be found, please migrate first.');
    process.exit(1);
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
global.db = db;

router.handleRouting(app);

app.listen(3000, function () {
    console.log('Started NodeJs app');
});