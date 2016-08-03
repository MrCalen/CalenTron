exports.getTram = function () {
    return new Promise(function (resolve, error) {
        var http = require('http');
        http.get({
            host: 'api-ratp.pierre-grimaud.fr',
            path: '/v2/tramways/3A/stations/471?destination=40'
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