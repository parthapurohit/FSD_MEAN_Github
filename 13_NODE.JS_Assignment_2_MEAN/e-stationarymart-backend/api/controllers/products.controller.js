const mysql = require('mysql');
const config = require('../../config');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

exports.all_products = function (req, res) {
    connection.query("SELECT * FROM product", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
}

exports.product_by_id = function (req, res) {
    connection.query(`SELECT * FROM Product where id=${req.params.id} LIMIT 1`, function (err, result, fields) {
        if (err) throw err;
        res.json(result[0]);
    });
}
