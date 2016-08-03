var express = require('express');
var app = express();
var fs = require("fs");
var constants = require('./constants');
var file = constants.getDataBaseFile();
var router = require('./router/routes');



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