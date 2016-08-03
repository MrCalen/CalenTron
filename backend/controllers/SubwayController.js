exports.getSubway = function () {
    return new Promise(function (resolve, error) {
        var http = require('http');
        http.get({
            host: 'api-ratp.pierre-grimaud.fr',
            path: '/v2/metros/7/stations/174?destination=19'
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