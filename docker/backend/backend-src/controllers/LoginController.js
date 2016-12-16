exports.loginRoute = function (req, res) {
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
            // Get access token for user
            var jwt = require('jsonwebtoken');
            var token = jwt.sign(users[0], global.config.server.key);

            res.send({
                success: true,
                message: token
            });
        }
    });
};