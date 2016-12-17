exports.parse = function () {
    var fs = require('fs');
    var path = require('path');

    var file = path.join(__dirname, '/../config.ini');

    var parseFile = function () {
        var ini = require('ini');
        global.config = ini.parse(fs.readFileSync(file, 'utf-8'));
    };

    var parseEnv = function () {
        global.server = {};
        global.weather = {};
        global.server.ping_url = process.env.PING_URL;
        global.server.cah_url = process.env.CAH_URL;
        global.weather['key'] = process.env.WEATHER_KEY;
    };

    if (fs.existsSync(file)) {
        parseFile();
    } else {
        parseEnv();
    }
};