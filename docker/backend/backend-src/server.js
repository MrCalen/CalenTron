var express = require('express');
var app = express();
var fs = require("fs");
var router = require('./router/routes');

// Fetch Server config
// Put it in global scope, so the jwt accesses it easily
try {
    require('./modules/configParser').parse();
    global.express = express;
    var db = require('./modules/db.js');
    db.migrate();
} catch (e) {
    console.error(e);
}

router.handleRouting(app);

app.listen(3000, function () {
    console.log('Started NodeJs app');
});
