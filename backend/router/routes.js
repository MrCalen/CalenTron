exports.handleRouting = function (app) {
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.post('/login', function (req, res) {
        var body = req.body;
        if (!body || Object.keys(body).length != 2) {
            res.send({
                success: false,
                message: 'You should provide only two keys'
            });
        }

        var login = body.login;
        var password = body.password;
        var bcrypt = require('bcrypt');
        var dbModule = require('../modules/db');

        dbModule.fetchUsers()
        .then(function (users) {
            users = users.filter(function (user) {
                return user.login === login
                       && bcrypt.compareSync(password, user.password);
            });

            if (!users.length) {
                res.send({
                    success: false,
                    message: 'No matching user was found'
                });
            } else {
                res.send({
                    success: true,
                    message: '' // FIXME: send access token here
                })
            }
        });
    });
};