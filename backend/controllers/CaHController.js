exports.getLastCAH = function () {
    return new Promise(function (resolve, error) {
        var jsdom = require("jsdom");
        jsdom.env(
            global.config.server.cah_url,
            ["http://code.jquery.com/jquery.js"],
            function (err, window) {
                var comic = window.$("#featured-comic")[0];
                resolve("https:" + comic.getAttribute('src'));
            }
        );
    });
};