exports.fetchUsers = function () {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.all("SELECT * FROM users", function(err, rows) {
            resolve(rows);
        });
    });
};

exports.fetchTasks = function () {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.all('SELECT * FROM tasks', function (err, rows) {
            resolve(rows);
        })
    });
};