const mysql = require('mysql');
const config = require('../../config');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

exports.login = function (req, res) {
    res.json(req.user.username == false ? false : req.user);
}

exports.get_user = function (id, cb) {
    connection.query(`SELECT id, username FROM User where id="${id}" LIMIT 1`, function (err, result, fields) {
        if (err) cb(err, { username: false, id: -1 });
        else if (result[0] != undefined) {
            cb(null, { username: result[0].username, id: result[0].id });
        } else {
            cb('User not found', { username: false, id: -1 });
        }
    });
}

