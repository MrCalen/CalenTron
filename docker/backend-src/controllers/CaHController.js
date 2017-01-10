exports.getLastCAH = function () {
    return new Promise(function (resolve, error) {
        var jsdom = require("jsdom");
        jsdom.env(
            global.config.server.cah_url,
            ["http://code.jquery.com/jquery.js"],
            function (err, window) {
                var comic = window.$("#featured-comic")[0];
                if (!comic) {
                    resolve('https://refinedgeekery.files.wordpress.com/2014/03/cyanide-happiness-volume2b1.jpg');
                    return;
                }
                resolve("https:" + comic.getAttribute('src'));
            }
        );
    });
};