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

exports.addTask = function () {

};

exports.removeTasks = function () {

};

exports.solveTask = function () {

};