exports.handleRouting = function (app) {
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/login', function (req, res) {
        var loginController = require('../controllers/LoginController');
        loginController.loginRoute(req, res);
    });


    /*

    +---------------------------
    | Api Middleware
    +---------------------------

    */
    function api(req, res, next) {
        var access_token = req.query.token;
        if (!access_token) {
            res.send({
                success: false,
                message: 'Please provide an access token'
            });
            return;
        }
        var jwt = require('jsonwebtoken');
        var decoded;

        try {
            decoded = jwt.verify(access_token, global.config.server.key);
        } catch (err) {
            res.send({
                success: false,
                message: 'Invalid access token'
            });
            return;
        }
        req.token = decoded;
        next();
    }

    var tasksController = require('../controllers/TasksController');
    app.get('/api/tasks', api, function (req, res) {
        tasksController.getTasks()
        .then(function (tasks) {
            res.send(tasks);
        });
    });

    app.post('/api/tasks/new', api, function (req, res) {
        var name = req.body.name;
        if (!name) {
            res.send({
               success: false,
                message: 'Name is required'
            });
        }
        tasksController.addTask(name)
        .then(function () {
            res.send({
                success: true,
                message: 'Task created successfully'
            });
        });
    });

    // Solve task
    app.post('/api/task/:task/solve', api, function (req, res) {
        var taskId = req.params.task;
        tasksController
        .solveTask(taskId, true)
        .then(function () {
           res.send({
               success: true,
               message: 'Task solved successfully'
           });
        });
    });

    app.post('/api/task/:task/unsolve', api, function (req, res) {
        var taskId = req.params.task;
        tasksController
            .solveTask(taskId, false)
            .then(function () {
                res.send({
                    success: true,
                    message: 'Task unsolved successfully'
                });
            });
    });

};