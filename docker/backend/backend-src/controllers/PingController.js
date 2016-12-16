exports.getPing = function () {
    return new Promise(function (resolve, error) {
        var tcpp = require('tcp-ping');
        tcpp.ping({ address: global.config.server.ping_url }, function(err, data) {
            resolve(data);
        });
    });
};