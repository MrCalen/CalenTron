exports.getWeather = function () {
    return new Promise(function (resolve, error) {
        var http = require('http');
        var token = global.config.weather.key;
        http.get({
            host: 'api.openweathermap.org',
            path: '/data/2.5/forecast?APPID=' + token + '&lat=' + 48.8156763 + '&lon=' + 2.3628221
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                var parsed = JSON.parse(body);
                resolve(parsed);
            });
        });
    });
};