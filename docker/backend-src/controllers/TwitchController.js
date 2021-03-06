exports.getTwichTop = function () {
    return new Promise(function (resolve, error) {
        var https = require('https');
        https.get({
            host: 'api.twitch.tv',
            path: '/kraken/streams?limit=5&game=League%20of%20Legends',
            headers: {
                'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
            }
        }, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                var parsed = JSON.parse(body);
                console.log(parsed);
                resolve(parsed);
            });
        });
    });
};