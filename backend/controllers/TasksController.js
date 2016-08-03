exports.getTasks = function () {
    return new Promise(function (resolve, error) {
        var db = require('../modules/db');
        db.fetchTasks().then(function (rows) {
            rows.forEach(function (task) {
                task.solved = task.solved !== 0;
            });
            resolve(rows);
        });
    });
};

exports.addTask = function (name) {
    return new Promise(function (resolve, error) {
        var db = require('../modules/db');
        db.createTask(name)
        .then(function () {
            resolve();
        });
    });
};

exports.removeTask = function () {

};

exports.solveTask = function (id) {
    return new Promise(function (resolve, error) {
        var db = require('../modules/db');
        db.solveTask(id)
        .then(function () {
            resolve();
        });
    });
};