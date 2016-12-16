var express = require('express');
var app = express();
var fs = require("fs");
var router = require('./router/routes');

// Fetch Server config
// Put it in global scope, so the jwt accesses it easily
var ini = require('ini');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
global.config = config;
global.express = express;

var db = require('./modules/db.js');
db.migrate();

router.handleRouting(app);

app.listen(3000, function () {
    console.log('Started NodeJs app');
});
