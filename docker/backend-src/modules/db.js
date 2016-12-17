exports.migrate = function () {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'db',
        port: '3306',
        user: 'root',
        password: process.env.DB_ENV_MYSQL_ROOT_PASSWORD,
        database: process.env.DB_ENV_MYSQL_DATABASE
    });

    connection.connect(function (err) {
        if (!err) {
            connection.query("CREATE TABLE IF NOT EXISTS users(login VARCHAR(255) PRIMARY KEY, password VARCHAR(255))");
            connection.query("CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTO_INCREMENT, name TEXT, solved INT)");
            global.db = connection;
        }
    });
};

exports.fetchUsers = function () {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.query("SELECT * FROM users", function(err, rows) {
            resolve(rows);
        });
    });
};

exports.fetchTasks = function () {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.query('SELECT * FROM tasks', function (err, rows) {
            resolve(rows);
        })
    });
};

exports.createTask = function (name) {
    return new Promise(function (resolve, error) {
        var db = global.db;
        var task = {
            name: name,
            solved: 0
        };
        db.query('INSERT INTO tasks SET ?', task);
        resolve();
    });
};

exports.solveTask = function (id, solve) {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.query('UPDATE tasks SET solved = ? WHERE id = ?', [solve ? 1 : 0, id]);
        resolve();
    });
};

exports.removeTask = function(id) {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.query('DELETE FROM tasks WHERE id = ?', [id]);
        resolve();
    });
};