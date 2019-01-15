const mysql = require('mysql');
const config = require('../../config');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

// auto Admin order approval interval
var approval_interval = 1;

exports.all_orders = function (req, res) {
    connection.query(`UPDATE PurchaseOrder SET status = 'Approved' WHERE \`status\` IS NULL AND date_time < (NOW() - INTERVAL ${approval_interval} MINUTE)`, function (err, result, fields) {
        if (err) throw err;
    });
    connection.query(`SELECT * FROM PurchaseOrder where userid = ${req.user.id}`, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
}

exports.cart_items = function (req, res) {
    connection.query(`SELECT Product.id, Product.name, Product.price, Cart.qty FROM Product \
                      JOIN Cart on Product.id = Cart.productid and Cart.orderid = ${req.params.orderid}`
        , function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        }
    );
}


exports.modify_items = function (req, res) {
    connection.query(`SELECT Product.id, Product.name, Product.description, Product.image, Product.price, Cart.qty FROM Product \
                      JOIN Cart on Product.id = Cart.productid and Cart.orderid = ${req.params.orderid}`
        , function (err, result, fields) {
            if (err) throw err;
            connection.query(`DELETE from Cart where orderid = ${req.params.orderid}`,
                function (err, data, fields) { if (err) throw err; });
            connection.query(`DELETE from PurchaseOrder where id = ${req.params.orderid}`,
                function (err, data, fields) { if (err) throw err; });
            res.json(result);
        }
    );
}


exports.place_order = function (req, res) {
    connection.query(`INSERT INTO PurchaseOrder (total_price, userid) VALUES ('${req.body.totalPrice}', ${req.user.id})`, function (err, poresult, fields) {
        if (err) throw err;
        var values = [];
        for (var i = 0; i < req.body.cart.length; i++) {
            values.push([req.body.cart[i].id, poresult.insertId, req.body.cart[i].qty]);
        }
        connection.query(`INSERT INTO Cart (productid, orderid, qty) VALUES ?`, [values], function (err, cresult, fields) {
            if (err) throw err;
            res.json(cresult);
        });
    });
}

exports.cancel_order = function (req, res) {
    connection.query(`UPDATE PurchaseOrder SET status = 'Cancelled' WHERE id = ${req.body.orderid}`
        , function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
}
