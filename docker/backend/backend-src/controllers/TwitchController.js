exports.getTwichTop = function () {
    return new Promise(function (resolve, error) {
        var https = require('https');
        https.get({
            host: 'api.twitch.tv',
            path: '/kraken/streams?limit=5&game=League%20of%20Legends'
        }, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                var parsed = JSON.parse(body);
                resolve(parsed);
            });
        });
    });
};