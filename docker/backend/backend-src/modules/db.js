exports.migrate = function () {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'db',
        port: '3306',
        user: 'root',
        password: process.env.DB_ENV_MYSQL_ROOT_PASSWORD,
        database: process.env.DB_ENV_MYSQL_DATABASE
    });

    connection.connect();
    connection.query("CREATE TABLE IF NOT EXISTS users(login VARCHAR(255) PRIMARY KEY, password VARCHAR(255))");
    connection.query("CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTO_INCREMENT, name TEXT, solved INT)");

    connection.query("INSERT INTO users SET ?", {
        'login': config.user.login,
        'password': config.user.password
    });
    connection.end();
};

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

exports.createTask = function (name) {
    return new Promise(function (resolve, error) {
        var db = global.db;
        var stm = db.prepare('INSERT INTO tasks(name, solved) VALUES(?, ?)');
        stm.run(name, 0);
        resolve();
    });
};

exports.solveTask = function (id, solve) {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.run('UPDATE tasks SET solved = ? WHERE id = ?', solve ? 1 : 0, id);
        resolve();
    });
};

exports.removeTask = function(id) {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.run('DELETE FROM tasks WHERE id = ?', id);
        resolve();
    });
};