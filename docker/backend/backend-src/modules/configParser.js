exports.parse = function () {
    var fs = require('fs');
    var path = require('path');

    var file = path.join(__dirname, '/../config.ini');

    var parseFile = function () {
        var ini = require('ini');
        global.config = ini.parse(fs.readFileSync(file, 'utf-8'));
    };

    var parseEnv = function () {
        var server = {};
        var weather = {};
        server.ping_url = process.env.PING_URL;
        server.cah_url = process.env.CAH_URL;
        weather['key'] = process.env.WEATHER_KEY;

        global.config = {
            server: server,
            weather: weather
        };
    };

    if (fs.existsSync(file)) {
        parseFile();
    } else {
        parseEnv();
    }
};