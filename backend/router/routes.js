exports.handleRouting = function (app) {
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.post('/login', function (req, res) {
        var loginController = require('../controllers/LoginController');
        loginController.loginRoute(req, res);
    });
};