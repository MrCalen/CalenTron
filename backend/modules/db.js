exports.fetchUsers = function () {
    return new Promise(function (resolve, error) {
        var db = global.db;
        db.all("SELECT * FROM users", function(err, rows) {
            resolve(rows);
        });
    });
};